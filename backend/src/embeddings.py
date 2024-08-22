from sentence_transformers import SentenceTransformer
import numpy as np

class EmbeddingGenerator:
    def __init__(self, model_name: str = "all-mpnet-base-v2 "):
        self.model  = SentenceTransformer(model_name)
        
    def generate_embeddings(self, texts: list[str]) -> np.ndarray:
        """
        Generate embeddings for a list of texts.
        
        :param texts: List of text strings to generate embeddings for.
        :return: Numpy array of embeddings where each row is an embedding for a corresponding text.
        """
        return np.array(self.model.encode(texts, normalize_embeddings=True))