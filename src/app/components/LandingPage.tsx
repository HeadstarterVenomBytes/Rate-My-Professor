import { Box, Button, Container, Typography, Grid, AppBar, Toolbar, Link } from "@mui/material";
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1a0033" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            ProfPick
          </Typography>
          <Link href="#" variant="button" color="inherit" sx={{ marginRight: 2 }}>
            Login
          </Link>
          <Link href="#" variant="button" color="inherit">
            Sign Up
          </Link>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "100vw", height: "calc(100vh - 64px)" }}>
        <Grid container spacing={0} sx={{ height: "100%", width: "100%" }}>
          <Grid item xs={12} md={6} sx={{ padding: 4, display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#2a004f" }}>
            <Typography variant="h3" component="h1" sx={{ color: "#fff", fontWeight: "bold" }}>
              Unlock your Learning Potential with the right Professor
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#999", marginTop: 2 }}>
              By Venombytes
            </Typography>
            <Button variant="contained" color="secondary" size="large" sx={{ marginTop: 4, backgroundColor: "#ff6699" }}>
              USE NOW
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ backgroundColor: "#b3a6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* was supposed to be a Logo Placeholder but put the example of the page instead*/}
            <Box sx={{ width: "60%", height: "60%", border: "2px dashed #000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="h4" sx={{ color: "#000" }}>
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
