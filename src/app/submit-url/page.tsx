"use client";

import React from "react";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";
import UrlSubmissionForm from "../components/UrlSubmissionForm";
import { useProfessorScraper } from "@/hooks/useProfessorScraper";

export default function SubmitUrlPage(): React.JSX.Element {
  const { scrapeProfessor, loading, error, professorData } =
    useProfessorScraper();

  const handleSubmitUrl = (url: string) => {
    // Call hook for sending the url to the backend for scraping
    scrapeProfessor(url);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <UrlSubmissionForm onSubmit={handleSubmitUrl} />

        {loading && (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error}
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
