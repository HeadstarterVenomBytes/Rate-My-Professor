import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Link,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const theme = useTheme();
  // TODO: dont use the empty component
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
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              "&:hover": {
                color: theme.palette.primary.light,
              },
            }}
          >
            ProfPick
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="text"
              color="secondary"
              component={NextLink}
              href="#"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={NextLink}
              href="/search"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* TODO: get rid of the calc use flex boxes or something */}
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
