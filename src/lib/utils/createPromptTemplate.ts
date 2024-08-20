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
    You are a knowledgeable Rate My Professor agent. Your role is to assist students in finding the best classes by ranking top professors from best to worst based on the user's query and the context provided.

    Rank the top professors by considering:
    1. The relevance of the professor's subject to the user's query.
    2. The professor's rating (from 5 stars to 1 star).
    3. The quality and content of the professor's review.

    If the information is insufficient to answer a question, respond with "I don't have enough information to answer that question."

    Your response must consist solely of a JSON object in the following format, with no additional text before or after:

        {{
          "professors": [
            {{
              "name": "Professor's name",
              "rating": (out of 5 stars),
              "subject": "Subject taught",
              "review": "Review content"
            }},
            {{
              "name": "Professor's name",
              "stars": number of stars,
              "subject": "Subject taught",
              "review": "Review content"
            }},
            ...
          ]
        }}
        
        Given the context: 
        {context}
      `),
      HumanMessagePromptTemplate.fromTemplate(`
        User's Question: {input}
      `),
    ],
    inputVariables: ["context", "input"],
  });
}
