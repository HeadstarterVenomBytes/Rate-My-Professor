import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { getRetriever } from "@/lib/utils/retriever";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatRequest, ProfessorResponse } from "@/types/review";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { createProfessorPromptTemplate } from "@/lib/utils/createPromptTemplate";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: ChatRequest[] = await req.json();
    const lastMessage = data[data.length - 1].content;

    const model = new ChatOpenAI({
      temperature: 0,
      modelName: "meta-llama/llama-3.1-8b-instruct:free",
      openAIApiKey: process.env.OPENROUTER_API_KEY!,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    }).bind({
      response_format: { type: "json_object" },
    });

    const documentPrompt = new PromptTemplate({
      template: `Review of professor: {professor}:
      Subject {subject}
      Rating: {stars} stars
      Review: {page_content}`,
      inputVariables: ["professor", "subject", "stars", "page_content"],
    });

    const retriever = await getRetriever();
    console.log("Retriever initialized");

    // Create a JSONOutputParser based on our expected interface
    const outputParser = new JsonOutputParser<ProfessorResponse>();

    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt: createProfessorPromptTemplate(),
      documentPrompt: documentPrompt,
      documentSeparator: "\n\n",
      outputParser: outputParser,
    });

    const chain = await createRetrievalChain({
      retriever: retriever,
      combineDocsChain,
    });

    const result = await chain.invoke({ input: lastMessage });
    return NextResponse.json(result.answer);
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
