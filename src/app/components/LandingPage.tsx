import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import TopBar from "./TopBar";
import NextLink from "next/link";

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const theme = useTheme();


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.palette.surface.main,
      }}
    >
      <TopBar />

      {/* Content */}
      <Box display="flex" flexGrow={1}>
        <Box
          component="div"
          flex="0 0 50%"
          padding={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ backgroundColor: theme.palette.primaryContainer.main }}
        >
          <Typography
            variant="h3"
            component="h1"
            color={theme.palette.onSurface.main}
            sx={{ fontWeight: "bold" }}
          >
            Unlock your Learning Potential with the right Professor
          </Typography>
          <Typography
            variant="subtitle1"
            color={theme.palette.onSurfaceVariant.main}
            sx={{ mt: 2 }}
          >
            By Venombytes
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="/search"
            LinkComponent={NextLink}
            sx={{
              mt: 4,
              maxWidth: "fit-content",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            USE NOW
          </Button>
        </Box>
        <Box
          display="flex"
          component="div"
          alignItems="center"
          justifyContent="center"
          sx={{
            flex: "0 0 50%",
            backgroundColor: theme.palette.tertiaryContainer.main,
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "60%",
              border: `2px dashed ${theme.palette.outline.main}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: theme.palette.onSurfaceVariant.main }}
            >
              picture here
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
