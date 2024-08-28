import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import TopBar from "./TopBar";
import NextLink from "next/link";
import Image from "next/image";

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
              width: "80%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              "&:hover img": {
                transform: "scale(1.1)",
                transition: "transform 0.3 ease-in-out",
              },
            }}
          >
            <Image
              src="/search_results.jpg"
              fill={true}
              alt="Example of what the professor search looks like"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCABJAFMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrqKKKYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//Z"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
