import React from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProfessorRecommendations } from "@/hooks/useProfessorRecommendations";
import { ProfessorRecommendation } from "@/types/review";

interface ProfessorSearchProps {}

const ProfessorSearch: React.FC<ProfessorSearchProps> = ({}) => {
  const { message, setMessage, sendMessage, recommendations, isLoading } =
    useProfessorRecommendations();

  // TODO: theme this with the theme
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
    >
      {/* Input search bar */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
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
          ></TextField>
        </Paper>
      </Box>

      {/* Display Professor Recommendations */}
      <Grid container spacing={2} mt={4}>
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((prof, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">{prof.name}</Typography>
                <Typography variant="body2">
                  Department: {prof.department}
                </Typography>
                <Typography variant="body2">
                  University: {prof.university}
                </Typography>
                {/* display highlighted stars based on number? */}
                <Typography variant="body2">
                  Average Rating: {prof.averageRating.toFixed(2)} stars
                </Typography>
                <Typography variant="body2">
                  Top Reviews Avg: {prof.topReviewsAvgRating.toFixed(2)} stars
                </Typography>
                <Typography variant="body2">
                  Number of Ratings: {prof.numRatings}
                </Typography>
                <Typography variant="body2">
                  Would Take Again: {prof.wouldTakeAgainPercentage.toFixed(2)}%
                </Typography>
                <Typography variant="body2">Tags: {prof.tags}</Typography>
                <Typography variant="body2">
                  Reviews: {prof.reviews_summary}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                  Explanation: {prof.explanation}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body2">
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
