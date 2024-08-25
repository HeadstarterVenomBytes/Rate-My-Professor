import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  useTheme,
  Chip,
  Rating,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdvancedSearchForm } from "./AdvancedSearchForm";
import { AdvancedSearchFormData } from "@/types/professorSearchQuery";
import { useProfessorRecommendations } from "@/hooks/useProfessorRecommendations";
import { useMetadata } from "@/hooks/useMetadataSets";

interface ProfessorSearchProps {}

const ProfessorSearch: React.FC<ProfessorSearchProps> = ({}) => {
  const {
    message,
    setMessage,
    formData,
    setFormData,
    sendMessage,
    recommendations,
    isLoading,
  } = useProfessorRecommendations();
  const {
    metadata,
    isLoading: isLoadingMetadata,
    error: metadataError,
  } = useMetadata();
  const theme = useTheme();

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      sx={{
        bgcolor: theme.palette.surface.main,
      }}
    >
      {/* Input search bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          mb: 4,
        }}
      >
        <Paper elevation={3} sx={{ width: "50%", mx: "auto", p: 3 }}>
          <TextField
            label="Enter your question"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={sendMessage} disabled={isLoading}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: theme.palette.surfaceContainerLowest.main,
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.outline.main,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                ".Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          {/* Advanced Search Form */}
          <AdvancedSearchForm
            formData={formData}
            setFormData={setFormData}
            metadata={metadata}
            isLoadingMetadata={isLoadingMetadata}
            metadataError={metadataError}
            onSubmit={sendMessage}
          />
        </Paper>
      </Box>

      {/* Display Professor Recommendations */}
      <Grid container spacing={3}>
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((prof, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={1}
                sx={{
                  bgcolor: theme.palette.surfaceContainer.main,
                  borderRadius: 4,
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {prof.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {prof.department} | {prof.university}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating value={prof.averageRating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({prof.averageRating.toFixed(2)})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Top Reviews Avg: {prof.topReviewsAvgRating.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prof.numRatings} ratings
                  </Typography>
                  <Box sx={{ mt: 2, mb: 2 }}>
                    {prof.tags.split(", ").map((tag, i) => (
                      <Chip
                        key={i}
                        label={tag}
                        size="small"
                        sx={{
                          mr: 0.5,
                          mb: 0.5,
                          bgColor: theme.palette.secondaryContainer.main,
                        }}
                      ></Chip>
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {prof.reviews_summary}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {prof.explanation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ mt: 2, textAlign: "center", width: "100%" }}
          >
            {isLoading
              ? "Loading recommendations..."
              : "No recommendations found."}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProfessorSearch;
