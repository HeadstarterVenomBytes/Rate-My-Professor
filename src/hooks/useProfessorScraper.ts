"use client";

import React, { useState } from "react";
import { Professor } from "@/types/professorDataTypes";

export function useProfessorScraper() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [professorData, setProfessorData] = useState<Professor | null>(null);

  const scrapeProfessor = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/scrape-professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to scrape professor data");
      }

      const data = await response.json();
      setProfessorData(data);
    } catch (error) {
      setError("Failed to scrape professor data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { scrapeProfessor, loading, error, professorData };
}
