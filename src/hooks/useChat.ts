"use client";
import React, { useState, useCallback } from "react";
import { ChatRequest, ProfessorRecommendation } from "@/types/review";

export const useChat = () => {
  const [messages, setMessages] = useState<ChatRequest[]>([
    {
      role: "assistant",
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = useCallback(async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: ChatRequest = { role: "user", content: message };
    setMessage("");

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, userMessage]),
      });

      // handle not okay response
      if (!response.body) {
        throw new Error("Response body is null");
      }

      if (!response.ok) {
        throw new Error("Something went wrong while generating response.");
      }

      const result = (await response.json()) as ProfessorRecommendation;
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const assistantIndex = updatedMessages.findIndex(
          (msg) => msg.role === "assistant" && !msg.content
        );
        if (assistantIndex !== -1) {
          updatedMessages[assistantIndex].content = JSON.stringify(result);
        }
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // TODO: show error to user?
    } finally {
      setIsLoading(false);
    }
  }, [message, messages, isLoading]);

  return {
    messages,
    message,
    setMessage,
    sendMessage,
    isLoading,
  };
};
