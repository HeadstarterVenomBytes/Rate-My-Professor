"use client";
import { Container } from "@mui/material";
import ProfessorSearch from "./components/ProfessorSearch";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <ProfessorSearch />
    </Container>
  );
}
