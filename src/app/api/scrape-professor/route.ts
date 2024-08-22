import { NextRequest, NextResponse } from "next/server";
import { scrapeProfessorPage } from "@/lib/utils/rateMyProfScraper";

interface ScrapeRequest {
  url: string;
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: ScrapeRequest = await req.json();
    console.log("Received json:", body);
    const url = body.url;
    console.log("Received url:", url);

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Valid URL is required" },
        { status: 400 }
      );
    }

    const professorData = await scrapeProfessorPage(url);

    return NextResponse.json(professorData, { status: 200 });
  } catch (error) {
    console.error("Error scraping professor data:", error);
    return NextResponse.json(
      { error: "Error scraping professor data" },
      { status: 500 }
    );
  }
}
