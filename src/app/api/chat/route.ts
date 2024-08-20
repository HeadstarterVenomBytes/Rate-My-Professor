import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { getRetriever } from "@/lib/utils/retriever";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatRequest, ProfessorMatch } from "@/types/review";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { createProfessorPromptTemplate } from "@/lib/utils/createPromptTemplate";

// Define the interface for the expected output
interface ProfessorOutput {
  answer: string;
  professors: {
    name: string;
    stars: number;
    subject: string;
    review: string;
  }[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: ChatRequest[] = await req.json();
    const lastMessage = data[data.length - 1].content;

    const model = new ChatOpenAI({
      temperature: 0,
      modelName: "meta-llama/llama-3.1-8b-instruct:free",
      streaming: true,
      openAIApiKey: process.env.OPENROUTER_API_KEY!,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    }).bind({
      response_format: { type: "json_object" },
    });

    const documentPrompt = new PromptTemplate({
      template: `Review of professor: {id}:
      Subject {subject}
      Rating: {stars} stars
      Review: {page_content}`,
      inputVariables: ["id", "subject", "stars", "page_content"],
    });

    const retriever = await getRetriever();
    console.log("Retriever initialized");

    // Create a JSONOutputParser based on our expected interface
    const outputParser = new JsonOutputParser<ProfessorOutput>();

    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt: createProfessorPromptTemplate(),
      documentPrompt: documentPrompt,
      outputParser: outputParser,
    });

    const chain = await createRetrievalChain({
      retriever: retriever,
      combineDocsChain,
    });

    // Stream the response
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const result of await chain.stream({
            input: lastMessage,
          })) {
            const { context, answer } = result;

            // Process and format the context and answer
            if (answer) {
              controller.enqueue(
                new TextEncoder().encode(JSON.stringify(answer))
              );
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });
    return new NextResponse(stream);
  } catch (error) {
    // Log the full error and stack trace to the server logs
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unknown error occurred");
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(`Error: ${errorMessage}`, { status: 500 });
  }
}
