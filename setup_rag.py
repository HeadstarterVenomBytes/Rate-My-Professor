from dotenv import load_dotenv
from os import getenv
from transformers import AutoTokenizer, AutoModel
import torch
from pinecone import Pinecone, ServerlessSpec
import json

load_dotenv()
pinecone_api_key = getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=pinecone_api_key)

with open("reviews.json", encoding="utf-8") as file:
    data = json.load(file)

model_name = "intfloat/multilingual-e5-large"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)


def create_embeddings(text):
    inputs = tokenizer(
        text, return_tensors="pt", padding=True, truncation=True, max_length=512
    )
    with torch.no_grad():
        outputs = model(**inputs)

    return outputs.last_hidden_state.mean(dim=1).squeeze().tolist()


processed_data = []

for review in data["reviews"]:
    embedding = create_embeddings(review["review"])
    processed_data.append(
        {
            "values": embedding,
            "id": review["professor"],
            "metadata": {
                "professor": review["professor"],
                "review": review["review"],
                "subject": review["subject"],
                "stars": review["stars"],
            },
        }
    )

index = pc.Index("rpm-rag")
upsert_response = index.upsert(vectors=processed_data, namespace="ns1")
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())
