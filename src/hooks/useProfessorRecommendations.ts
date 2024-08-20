"use client";
import React, { useState, useCallback, ReactChild } from "react";
import { ProfessorResponse, ProfessorRecommendation } from "@/types/review";

interface UseProfessorRecommendationsReturn {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
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

    const sendMessage = useCallback(async () => {
      if (!message.trim() || isLoading) return;

      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ role: "user", content: message }]),
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
    }, [message, isLoading]);

    return {
      message,
      setMessage,
      sendMessage,
      recommendations,
      isLoading,
    };
  };
