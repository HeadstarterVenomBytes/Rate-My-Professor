from flask import Flask, request, jsonify
from os import getenv
from .models import Professor
from .embeddings import EmbeddingService
from .pinecone_client import PineconeClient


app = Flask(__name__)

embedding_service = EmbeddingService()
pinecone_client = PineconeClient(
    api_key=getenv("PINECONE_API_KEY", ""),
    index_name=getenv("PINECONE_INDEX_NAME", ""),
)


@app.route("/upsert_professor", methods=["POST"])
def upsert_professor():
    data = request.get_json()

    # Validate and parse the professor data
    professor = Professor(**data)

    # Generate professor embedding
    review_texts = [review.review for review in professor.reviews]
    combined_embedding = embedding_service.generate_embeddings(
        name=professor.name,
        department=professor.department,
        university=professor.university,
        tags=professor.tags,
        review_texts=review_texts,
    )

    # Prepare professor metadata
    professor_metadata = {
        "name": professor.name,
        "department": professor.department,
        "university": professor.university,
        "averageRating": professor.averageRating,
    }

    # Upsert professor-level data
    professor_id = professor.name.replace(" ", "_")
    pinecone_client.upsert_professor_embeddings(
        professor_id, combined_embedding, professor_metadata
    )

    return (
        jsonify(
            {"status": "success", "message": f"Upserted professor {professor.name}"}
        ),
        200,
    )


if __name__ == "__main__":
    port = int(getenv("PORT", 8080))  # Default to 8080 if PORT is not set
    app.run(host="0.0.0.0", port=port)
