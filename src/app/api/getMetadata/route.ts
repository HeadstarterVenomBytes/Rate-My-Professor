import { NextRequest, NextResponse } from "next/server";
import { fetchMetadataSets } from "@/lib/utils/fetchPineconeMetadata";
import { MetadataResult } from "@/types/pineconeMetadata";

export async function GET(
  req: NextRequest
): Promise<NextResponse<MetadataResult | { error: string }>> {
  try {
    const indexName = process.env.PINECONE_INDEX_NAME_2!;

    const metadata = await fetchMetadataSets(indexName);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error retrieving pinecone metadata sets:", error);
    return NextResponse.json(
      { error: "Error retrieving pinecone metadata" },
      { status: 500 }
    );
  }
}
