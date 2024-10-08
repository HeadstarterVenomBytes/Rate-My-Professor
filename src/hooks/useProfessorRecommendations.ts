"use client";
import React, { useState, useCallback } from "react";
import { ProfessorResponse, ProfessorRecommendation } from "@/types/review";
import {
  ProfessorSearchRequest,
  AdvancedSearchFormData,
} from "@/types/professorSearchQuery";

interface UseProfessorRecommendationsReturn {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  formData: AdvancedSearchFormData;
  setFormData: React.Dispatch<React.SetStateAction<AdvancedSearchFormData>>;
  sendMessage: () => void;
  recommendations: ProfessorRecommendation[];
  isLoading: boolean;
}

export const useProfessorRecommendations =
  (): UseProfessorRecommendationsReturn => {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [recommendations, setRecommendations] = useState<
      ProfessorRecommendation[]
    >([]);
    const [formData, setFormData] = useState<AdvancedSearchFormData>({
      university: "",
      department: "",
      numRecommendations: 5,
    });

    const sendMessage = useCallback(async () => {
      if (!message.trim() || isLoading) return;

      setIsLoading(true);

      try {
        const response = await fetch("/api/recommendProfessors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            filters: formData,
          } as ProfessorSearchRequest),
        });

        if (!response.ok || !response.body) {
          throw new Error("Something went wrong while generating response.");
        }

        const result: ProfessorResponse = await response.json();

        // Ensure result is an array before setting recommendations
        if (Array.isArray(result.professors)) {
          setRecommendations(result.professors);
        } else {
          console.error("Unexpected response format:", result);
          // Handle the error, e.g., set an empty array or display an error message
          setRecommendations([]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        // TODO: show error to user?
      } finally {
        setIsLoading(false);
      }
    }, [message, isLoading, formData]);

    return {
      message,
      setMessage,
      sendMessage,
      formData,
      setFormData,
      recommendations,
      isLoading,
    };
  };
