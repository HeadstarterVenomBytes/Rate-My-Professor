export interface ProfessorSearchRequest {
  message: string;
  filters: AdvancedSearchFormData;
}

export interface AdvancedSearchFormData {
  university: string;
  department: string;
  numRecommendations: number;
}
