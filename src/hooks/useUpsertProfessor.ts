"use client";
import React, { useState, useCallback } from "react";
import { Professor } from "@/types/professorDataTypes";

interface UpsertResult {
  success: boolean;
  message?: string;
  error?: string;
}

type UpsertCallback = (result: UpsertResult) => void;

export function useUpsertProfessor() {
  const [loading, setLoading] = useState<boolean>(false);

  const upsertProfessor = useCallback(
    async (professorData: Professor, callback: UpsertCallback) => {
      setLoading(true);
      const cloudRunHost = process.env.NEXT_PUBLIC_CLOUD_RUN_HOST;
      const cloudRunPort = process.env.NEXT_PUBLIC_CLOUD_RUN_PORT;

      if (!cloudRunHost) {
        callback({ success: false, error: "Cloud Run host is not configured" });
        setLoading(false);
        return;
      }

      let cloudRunUrl = cloudRunHost;
      if (cloudRunPort) {
        cloudRunUrl += `:${cloudRunPort}`;
      }
      cloudRunUrl += "/upsert_professor";

      try {
        const response = await fetch(cloudRunUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(professorData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          callback({ success: true, message: data.message });
        } else {
          callback({
            success: false,
            error: data.message || "Unknown error occured",
          });
        }
      } catch (error) {
        console.error("Failed to upsert professor data:", error);
        callback({ success: false, error: "Failed to upsert professor data" });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { upsertProfessor, loading };
}
