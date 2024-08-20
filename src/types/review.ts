export interface ChatRequest {
  role: "user" | "assistant";
  content: string;
}

// Define the interface for the expected output
export interface ProfessorRecommendation {
  name: string;
  rating: number;
  subject: string;
  review: string;
}

export interface ProfessorResponse {
  professors: ProfessorRecommendation[];
}
