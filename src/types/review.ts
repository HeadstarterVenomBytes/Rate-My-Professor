export interface ChatRequest {
  role: "user" | "assistant";
  content: string;
}

// Define the interface for the expected output
export interface ProfessorRecommendation {
  name: string;
  university: string;
  averageRating: number;
  topReviewsAvgRating: number;
  numRatings: number;
  wouldTakeAgainPercentage: number;
  tags: string;
  reviews_summary: string;
  explanation: string;
}

export interface ProfessorResponse {
  professors: ProfessorRecommendation[];
}
