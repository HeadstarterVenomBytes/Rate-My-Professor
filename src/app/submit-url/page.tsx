"use client";

import React, { useState, useCallback } from "react";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";
import UrlSubmissionForm from "../components/UrlSubmissionForm";
import { useProfessorScraper } from "@/hooks/useProfessorScraper";
import { useUpsertProfessor } from "@/hooks/useUpsertProfessor";

export default function SubmitUrlPage(): React.JSX.Element {
  const {
    scrapeProfessor,
    loading: scraping,
    error: scrapeError,
    professorData,
  } = useProfessorScraper();
  const { upsertProfessor, loading: upserting } = useUpsertProfessor();

  const [upsertError, setUpsertError] = useState<string | null>(null);
  const [upsertSuccess, setUpsertSuccess] = useState<string | null>(null);

  const handleSubmitUrl = useCallback(
    async (url: string) => {
      setUpsertError(null);
      setUpsertSuccess(null);

      try {
        // Call hook for sending the url to the backend for scraping
        await scrapeProfessor(url);

        if (professorData) {
          upsertProfessor(professorData, (result) => {
            if (result.success) {
              setUpsertSuccess(
                result.message || "Professor data usperted successfully"
              );
            } else {
              setUpsertError(result.error || "Failed to upsert professor data");
            }
          });
        }
      } catch (error) {
        console.error("Error during scraping or upserting:", error);
        setUpsertError("An error occured during the process");
      }
    },
    [scrapeProfessor, upsertProfessor, professorData]
  );

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <UrlSubmissionForm
          onSubmit={handleSubmitUrl}
          loading={scraping || upserting}
        />

        {(scraping || upserting) && (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        )}

        {scrapeError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Scraping Error: {scrapeError}
          </Typography>
        )}
        {upsertError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Upsert Error: {upsertError}
          </Typography>
        )}
        {upsertSuccess && (
          <Typography color="success" sx={{ mt: 2 }}>
            {upsertSuccess}
          </Typography>
        )}

        {professorData && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Professor Data:</Typography>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(professorData, null, 2)}
            </pre>
          </div>
        )}
      </Paper>
    </Container>
  );
}
