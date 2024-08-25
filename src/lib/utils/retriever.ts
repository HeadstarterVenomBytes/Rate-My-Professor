import { PineconeStore } from "@langchain/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { pineconeClient } from "../clients/pinecone";
import { AdvancedSearchFormData } from "@/types/professorSearchQuery";

export async function getRetriever(filters: AdvancedSearchFormData) {
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACEHUB_API_KEY!,
    model: "sentence-transformers/all-mpnet-base-v2",
  });

  const pineconeIndex = pineconeClient.Index(
    process.env.PINECONE_INDEX_NAME_2!
  );

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    textKey: "reviews_summary",
  });

  return vectorStore.asRetriever({
    k: filters.numRecommendations,
    filter: {
      ...(filters.university && { university: filters.university }),
      ...(filters.department && { department: filters.department }),
    },
  });
}
