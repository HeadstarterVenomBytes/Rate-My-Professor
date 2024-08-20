import { PineconeStore } from "@langchain/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { pineconeClient } from "../clients/pinecone";

export async function getRetriever() {
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACEHUB_API_KEY!,
    model: "intfloat/multilingual-e5-large",
  });

  const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX_NAME!);

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: "ns1",
    textKey: "review",
  });

  return vectorStore.asRetriever({
    k: 3,
  });
}
