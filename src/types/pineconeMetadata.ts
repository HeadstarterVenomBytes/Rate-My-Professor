import { RecordMetadata } from "@pinecone-database/pinecone";

export interface PineconeMetadata extends RecordMetadata {
  averageRating: number;
  department: string;
  name: string;
  numRatings: number;
  reviews_summary: string;
  tags: string;
  topReviewsAvgRating: number;
  university: string;
  wouldTakeAgainPercentage: number;
}
