import { pineconeClient } from "../clients/pinecone";
import { PineconeMetadata } from "@/types/pineconeMetadata";
import { MetadataResult, MetadataField } from "@/types/pineconeMetadata";

export async function fetchMetadataSets(
  indexName: string,
  batchSize: number = 100
): Promise<MetadataResult> {
  const pineconeIndex = pineconeClient.index<PineconeMetadata>(indexName);
  const metadataSets: Record<MetadataField, Set<string>> = {
    university: new Set<string>(),
    department: new Set<string>(),
  };

  let paginationToken: string | undefined = undefined;

  try {
    do {
      // Fetch paginated list of vector IDs
      const { vectors, pagination } = await pineconeIndex.listPaginated({
        limit: batchSize,
        paginationToken,
      });

      // If no vectors are returned break out of the loop
      if (!vectors?.length) break;

      const vectorIds = vectors
        .map((vector) => vector.id)
        .filter((id) => id !== undefined);
      if (!vectorIds.length) break;

      const fetchedData = await pineconeIndex.fetch(vectorIds);

      // Extract metadata from fetched vectors and add to sets
      for (const id of vectorIds) {
        const metadata = fetchedData?.records?.[id]?.metadata;
        if (metadata) {
          (Object.keys(metadataSets) as MetadataField[]).forEach((field) => {
            const value = metadata[field];
            if (typeof value === "string") {
              metadataSets[field].add(value);
            }
          });
        }
      }

      // Update pagination token for the next iteration
      paginationToken = pagination?.next;
    } while (paginationToken);

    return Object.fromEntries(
      Object.entries(metadataSets).map(([key, set]) => [key, [...set].sort()])
    ) as MetadataResult;
  } catch (error) {
    console.error("Error during metadata fetching:", error);
    throw new Error("Failed to fetch metadata from Pinecone");
  }
}
