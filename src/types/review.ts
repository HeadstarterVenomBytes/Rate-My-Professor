export interface ChatRequest {
  role: "user" | "assistant";
  content: string;
}

export interface ProfessorMatch {
  id: string;
  review: string;
  subject: string;
  stars: number;
}

// Define the interface for the expected output
export interface ProfessorRecommendation {
  answer: string;
  professors: Array<{
    name: string;
    stars: number;
    subject: string;
    review: string;
  }>;
}
