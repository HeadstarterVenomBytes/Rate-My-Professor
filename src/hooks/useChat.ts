"use client";
import React, { useState, useCallback } from "react";
import { ChatRequest } from "@/types/review";

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
    setMessage("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: message },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const processText = async ({
        done,
        value,
      }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
        if (done) {
          return;
        }

        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });

        return reader.read().then(processText);
      };

      await reader.read().then(processText);
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
