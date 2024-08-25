import React, { useState, useEffect } from "react";
import { MetadataResult } from "@/types/pineconeMetadata";

export const useMetadata = () => {
  const [metadata, setMetadata] = useState<MetadataResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadataSets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getMetadata");
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }

        const data: MetadataResult = await response.json();
        setMetadata(data);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occured"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetadataSets();
  }, []);

  return { metadata, isLoading, error };
};
