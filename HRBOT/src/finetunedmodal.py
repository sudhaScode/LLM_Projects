from llama_index.core.readers.file.base import SimpleDirectoryReader
from src.utility import safety_settings, custom_sentence_splitter
from src.utility import chuck, create_index, get_index
import os
from dotenv import load_dotenv
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.gemini import GeminiEmbedding
import os
from llama_index.core import  Document, VectorStoreIndex,StorageContext, load_index_from_storage
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import Settings, PromptTemplate
import chromadb

#With retriever
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core import VectorStoreIndex, get_response_synthesizer
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.postprocessor import SimilarityPostprocessor


# Load environment
print(load_dotenv())
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

#Read the documents 
documents = SimpleDirectoryReader(f"C:/Users/SUBOMMAS/LLM_Projects/HRBOT/resources/HR_Documents").load_data()


PERSIST_DIR = f"C:/Users/SUBOMMAS/LLM_Projects/HRBOT/resources/persis"

#LLM 
gemini_embedding = GeminiEmbedding(model_name="models/embedding-001", api_key=GOOGLE_API_KEY)
gemini = Gemini(model_name="models/gemini-pro", temperature=0.5, max_tokens=2048, safety_settings=safety_settings)
"""
# build and store index

#as default chroma db uses the open ai embeddings
#setting up Gemini pro -llm and gemini embedding
Settings.llm = gemini
Settings.embed_model = gemini_embedding

# build index
persist_client = chromadb.PersistentClient(path=PERSIST_DIR)
persist_collection = persist_client.get_or_create_collection("vectorbot")
print(persist_collection, "chroma_collection")

persist_store = ChromaVectorStore(chroma_collection=persist_collection)
persist_context = StorageContext.from_defaults(vector_store=persist_store)

# load the data and create index
index = VectorStoreIndex.from_documents(documents=documents, storage_context=persist_context, embed_model=gemini_embedding, transformations=[custom_sentence_splitter])
index.storage_context.persist(persist_dir=PERSIST_DIR)
index = load_index_from_storage(storage_context=persist_context)
"""

index = create_index(gemini, gemini_embedding, documents, PERSIST_DIR)
"""
custom_qa_prompt_str=(
    "Given the context information and not prior knowledge, "
    "answer the query in the style of a Shakespeare play.\n"
    "Query: {query_str}\n"
    "Answer: "
) 
qa_prompt_tmpl = PromptTemplate(custom_qa_prompt_str)

query_engine=index.as_query_engine(text_qa_template = qa_prompt_tmpl)"""
query_engine=index.as_query_engine()

"""
# configure retriever
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=1,
)
# configure response synthesizer
response_synthesizer = get_response_synthesizer()

# assemble query engine
query_engine = RetrieverQueryEngine(
    retriever=retriever,
    response_synthesizer=response_synthesizer,
    node_postprocessors=[SimilarityPostprocessor(similarity_cutoff=0)],
)
"""
print("Finetuned successful")
print(index)

def update_index(file_path):
    text_chucks = chuck(file_path)
    """
    embeddings = []
    for chunk in text_chucks:
        chunk_embedding = text_to_embedding(chunk)
        embeddings.append(chunk_embedding)

    data = []
    for i, chunk in enumerate(text_chucks):
        # Create a dictionary for each data point
        data_point = {
            #"text": chunk,  # Original text chunk
            "embedding": embeddings[i],  # Corresponding embedding for the chunk
            "id": str(f"chunk_{i}")  # Unique identifier for each chunk
        }
        data.append(data_point)
    ids = [item['id'] for item in data]
    data_embeddings = [item['embedding'] for item in data]
    # Create an ephemeral ChromaDB client
    chroma_client = chromadb.PersistentClient(path=f"C:/Users/SUBOMMAS/LLM_Projects/HRBOT/resources/vectorbot")
    #chroma_collection = chroma_client.create_collection(path="../resources/embeddingsDB")

    # Create a Chroma collection
    chroma_collection = chroma_client.get_collection("vectorbot")
    print(chroma_collection, "chroma_collection")

    # Add embeddings to the Chroma collection
    chroma_collection.upsert(ids=ids, embeddings=data_embeddings)
    """
    doc_chunks = []
    for i, text in enumerate(text_chucks):
        doc = Document(text=text, id_=f"doc_id_{i}")
        doc_chunks.append(doc)

    # insert
    print(doc_chunks)
    
    for doc_chunk in doc_chunks:
        index.insert(doc_chunk)
    
    #print(embeddings)
    print(index)

def text_to_embedding(text):
    embeddings = gemini_embedding.get_text_embedding(text)
    return embeddings

