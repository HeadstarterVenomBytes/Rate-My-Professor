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
