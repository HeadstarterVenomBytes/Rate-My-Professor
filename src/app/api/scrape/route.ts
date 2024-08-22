import { NextRequest, NextResponse } from "next/server";
import { scrapeProfessorPage } from "@/lib/utils/rateMyProfScraper";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const url = req.body;
    }
}
