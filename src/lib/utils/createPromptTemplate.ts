import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";

export function createChatPromptTemplate() {
  return new ChatPromptTemplate({
    promptMessages: [
      SystemMessagePromptTemplate.fromTemplate(`
          You are a rate my professor agent to help students find classes. For every user question, 
          return the top 3 professors that match the user's question and use them to answer the question.
        `),
      HumanMessagePromptTemplate.fromTemplate(`
          User: {question}
          Returned Results:
          {context}
        `),
    ],
    inputVariables: ["question", "context"],
  });
}

export const professorPromptTemplate = ChatPromptTemplate.fromTemplate(`
  You are a rate my professor agent who helps students find classes by answering their questions based on the context below.
  
  Context:
  {context}
  
  User's Question: {input}
  
  Provide a concise, accurate response based on the context. If the answer is not clear, say "I don't know." Always end with "Thanks for asking!"
`);
