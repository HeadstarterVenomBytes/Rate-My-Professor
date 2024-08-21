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
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1a0033" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            ProfPick
          </Typography>
          <Link
            href="#"
            variant="button"
            color="secondary"
            sx={{ marginRight: 2 }}
            component={NextLink}
          >
            Login
          </Link>
          <Link
            href="/search"
            variant="button"
            color="secondary"
            component={NextLink}
          >
            Sign Up
          </Link>
        </Toolbar>
      </AppBar>

      {/* TODO: get rid of the calc use flex boxes or something */}
      <Box sx={{ width: "100vw", height: "calc(100vh - 64px)" }}>
        <Grid container spacing={0} sx={{ height: "100%", width: "100%" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: theme.palette.primaryContainer.main,
            }}
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
              size="large"
              sx={{
                mt: 4,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              USE NOW
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: theme.palette.tertiaryContainer.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* was supposed to be a Logo Placeholder but put the example of the page instead*/}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
