import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { getRetriever } from "@/lib/utils/retriever";
import { ChatRequest, ProfessorMatch } from "@/types/review";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createProfessorPromptTemplate } from "@/lib/utils/createPromptTemplate";

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
    });

    const retriever = await getRetriever();
    console.log("Retriever initialized");

    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt: createProfessorPromptTemplate(),
      outputParser: new StringOutputParser(),
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
              controller.enqueue(new TextEncoder().encode(answer));
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
