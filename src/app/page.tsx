"use client";
import { Container } from "@mui/material";
import ChatComponent from "./components/ChatComponent";

export default function Home() {
  return (
    <Container maxWidth="md">
      <ChatComponent />
    </Container>
  );
}
