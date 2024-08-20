import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { PromptTemplate } from "@langchain/core/prompts";

export function createProfessorPromptTemplate() {
  return new ChatPromptTemplate({
    promptMessages: [
      SystemMessagePromptTemplate.fromTemplate(`
        You are a rate my professor agent who helps students find classes by answering their questions based on the context provided.
        Provide a concise, accurate response based on the context. If the answer is not clear, say "I don't know." Always end with "Thanks for asking!"

        Context: 
        {context}
      `),
      HumanMessagePromptTemplate.fromTemplate(`
        User's Question: {input}
      `),
    ],
    inputVariables: ["context", "input"],
  });
}
