"use client";
import { Container } from "@mui/material";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
    <Container maxWidth={false} disableGutters>
      <LandingPage />
    </Container>
  );
}
