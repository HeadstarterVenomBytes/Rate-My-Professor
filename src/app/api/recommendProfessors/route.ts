import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { getRetriever } from "@/lib/utils/retriever";
import { PromptTemplate } from "@langchain/core/prompts";
import { ProfessorResponse } from "@/types/review";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { createProfessorPromptTemplate } from "@/lib/utils/createPromptTemplate";
import { ProfessorSearchRequest } from "@/types/professorSearchQuery";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { message, filters }: ProfessorSearchRequest = await req.json();

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
      template: `Review of professor: {name}:
University: {university}
Department: {department}
Average Rating: {averageRating} stars
Top Reviews Average Rating: {topReviewsAvgRating} stars
Number of Ratings: {numRatings}
Tags: {tags}
Reviews Summary: {page_content}`,
      inputVariables: [
        "name",
        "university",
        "department",
        "averageRating",
        "topReviewsAvgRating",
        "numRatings",
        "tags",
        "page_content",
      ],
    });

    const retriever = await getRetriever(filters);
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

    const result = await chain.invoke({
      input: message,
      numRecommendations: filters.numRecommendations,
    });
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
