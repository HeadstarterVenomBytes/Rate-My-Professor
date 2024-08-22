"use client";

import React from "react";
import { Container, Paper } from "@mui/material";
import UrlSubmissionForm from "../components/UrlSubmissionForm";

// TODO: write hook for the api request
export default function SubmitUrlPage(): React.JSX.Element {
  const handleSubmitUrl = (url: string) => {
    // Call hook for sending the url to the backend for scraping
    console.log("URL submitted for scraping:", url);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <UrlSubmissionForm onSubmit={handleSubmitUrl} />
      </Paper>
    </Container>
  );
}
