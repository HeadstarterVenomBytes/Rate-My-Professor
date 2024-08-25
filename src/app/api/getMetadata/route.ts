import { NextRequest, NextResponse } from "next/server";
import { fetchMetadataSets } from "@/lib/utils/pineconeMetadata";

export default async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const indexName = process.env.PINECONE_INDEX_NAME_2!;

    const metadata = await fetchMetadataSets(indexName);

    return NextResponse.json({
      universities: metadata.university,
      departments: metadata.department,
    });
  } catch (error) {
    console.error("Error retrieving pinecone metadata sets:", error);
    return NextResponse.json(
      { error: "Error retrieving pinecone metadata" },
      { status: 500 }
    );
  }
}
