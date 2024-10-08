export enum YesNo {
  Yes = "Yes",
  No = "No",
}

export enum Attendance {
  Mandatory = "Mandatory",
  NotMandatory = "Not Mandatory",
}

export enum Grade {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  F = "F",
  NotSureYet = "Not sure yet",
}

export interface Professor {
  name: string;
  department: string;
  university: string;
  averageRating: number;
  numRatings: number;
  tags: string[];
  reviews: ProfessorReview[];
}

export interface ProfessorReview {
  quality: number;
  difficulty: number;
  course: string;
  date: Date;
  review: string;
  helpfulVotes: number;
  unhelpfulVotes: number;
  textbook?: YesNo;
  forCredit?: YesNo;
  attendence?: Attendance;
  grade?: Grade;
  wouldTakeAgain?: YesNo;
  tags?: string[];
}
