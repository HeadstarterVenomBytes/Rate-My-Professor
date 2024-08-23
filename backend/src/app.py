import logging
from os import getenv

from flask import Flask, jsonify, request
from flask_cors import CORS

from .embeddings import EmbeddingService
from .models import Professor
from .pinecone_client import PineconeClient

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

embedding_service = EmbeddingService()
pinecone_client = PineconeClient(
    api_key=getenv("PINECONE_API_KEY", ""),
    index_name=getenv("PINECONE_INDEX_NAME", ""),
)


@app.route("/upsert_professor", methods=["POST"])
def upsert_professor():
    logger.info("Received request to upsert professor")
    data = request.get_json()
    logger.debug(f"Received data: {data}")

    try:
        # Validate and parse the professor data
        professor = Professor(**data)
        logger.info(f"Created Professor object for {professor.name}")

        # Generate professor embedding
        review_texts = [review.review for review in professor.reviews]
        logger.debug(f"Generating embeddings for {len(review_texts)} reviews")
        combined_embedding = embedding_service.generate_embeddings(
            name=professor.name,
            department=professor.department,
            university=professor.university,
            tags=professor.tags,
            review_texts=review_texts,
        )
        logger.info(f"Generated combined embedding of shape {combined_embedding.shape}")

        # Prepare professor metadata
        professor_metadata = {
            "name": professor.name,
            "department": professor.department,
            "university": professor.university,
            "averageRating": professor.averageRating,
        }
        logger.debug(f"Prepared metadata: {professor_metadata}")

        # Upsert professor-level data
        professor_id = professor.name.replace(" ", "_")
        logger.info(f"Upserting professor data with ID: {professor_id}")
        pinecone_client.upsert_professor_embeddings(
            professor_id, combined_embedding, professor_metadata
        )
        logger.info(f"Successfully upserted professor {professor.name}")

        return (
            jsonify(
                {"status": "success", "message": f"Upserted professor {professor.name}"}
            ),
            200,
        )
    except Exception as e:
        logger.error(f"Error upserting professor: {str(e)}", exc_info=True)
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    port = int(getenv("PORT", 8080))  # Default to 8080 if PORT is not set
    logger.info(f"Starting Flask app on port {port}")
    app.run(host="0.0.0.0", port=port)
