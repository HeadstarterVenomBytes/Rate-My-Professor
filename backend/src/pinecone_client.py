from pinecone import Pinecone
import numpy as np

class PineconeClient:
    def __init__(self, api_key: str, index_name: str):
        self.pc = Pinecone(api_key)
        self.index = self.pc.Index(index_name)
    
    def upsert_professor_embeddings(self, professor_id: str, embedding: np.ndarray, metadata: dict): 
        """
        Upsert professor embeddings and metadata into Pinecone.
        """
        # Convert embedding to list for Pinecone upsert
        embedding_list = embedding.tolist()
        self.index.upsert(vectors=[(professor_id, embedding_list, metadata)])
        
        