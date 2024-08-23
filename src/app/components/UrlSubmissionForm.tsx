"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Typography,
  useTheme,
} from "@mui/material";

interface UrlSubmissionFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

// TODO: ability to submit multiple urls
const UrlSubmissionForm: React.FC<UrlSubmissionFormProps> = ({
  onSubmit,
  loading,
}) => {
  const theme = useTheme();
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  // TODO: use regex to verify rate my professor url?
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl("");
      setError("");
    } else {
      setError("Please enter a valid URL.");
    }
  };

  // TODO: theming with the custom theme maybe not make it full width.
  return (
    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
      <Typography variant="h6" component="h2" gutterBottom>
        Submit Rate My Professor URL for Scraping
      </Typography>
      <FormGroup>
        <TextField
          fullWidth
          label="Enter URL to scrape"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={!error}
          helperText={error}
          margin="normal"
        />
        <FormHelperText>Enter the full URL including https://</FormHelperText>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit URL"}
        </Button>
      </FormGroup>
    </FormControl>
  );
};

export default UrlSubmissionForm;
