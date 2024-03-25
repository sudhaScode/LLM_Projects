from llama_index.core.node_parser import SentenceSplitter
import os
import re
import pdfplumber
from IPython.display import Markdown,display
import textwrap
from llama_index.core import  SimpleDirectoryReader, VectorStoreIndex,StorageContext, load_index_from_storage
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.llms.gemini import Gemini
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import Settings
import chromadb


#text splitter
custom_separator = '\n'
custom_chunk_size = 1000
custom_chunk_overlap = 50
custom_paragraph_separator = '\n\n\n'
custom_regex = '[^,.;。？！]+[,.;。？！]?'
custom_sentence_splitter = SentenceSplitter(
    separator=custom_separator,
    chunk_size=custom_chunk_size,
    chunk_overlap=custom_chunk_overlap,
    paragraph_separator=custom_paragraph_separator,    
)
#Safety settings
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
]

def create_index(gemini, gemini_embedding, documents, PERSIST_DIR):
  Settings.llm = gemini
  Settings.embed_model = gemini_embedding

  # build index
  persist_client = chromadb.PersistentClient(path=PERSIST_DIR)
  persist_collection = persist_client.get_or_create_collection("persis")

  persist_store = ChromaVectorStore(chroma_collection=persist_collection)
  persist_context = StorageContext.from_defaults(vector_store=persist_store)

  # load the data and create index
  index = VectorStoreIndex.from_documents(documents=documents, storage_context=persist_context, embed_model=gemini_embedding, transformations=[custom_sentence_splitter])
  index.storage_context.persist(persist_dir=PERSIST_DIR)
  index = load_index_from_storage(storage_context=persist_context)
  return index


def get_index(gemini, gemini_embedding, PERSIST_DIR):
  Settings.llm = gemini
  Settings.embed_model = gemini_embedding
  # load index
  persist_client = chromadb.PersistentClient(path=PERSIST_DIR)
  persist_collection = persist_client.get_or_create_collection("persis")

  persist_store = ChromaVectorStore(chroma_collection=persist_collection)
  index =  VectorStoreIndex.from_vector_store(persist_store)
  
  
  print(index)
  return index
"""
# create a method which returns the index
def create_index(gemini, gemini_embedding, documents):
    #configure the settings
    # if directory won't exits

      #create the client

      # create the vector store

      #make store persistance

      # return index
    # else
       
       #create idex from storage

       # return index


"""

def chuck(file_path):
  document = pdf_folder_reader(file_path)

  cleaned_text = preprocess_text(document)

  cleaned_text = remove_special_characters(cleaned_text)
  custom_chunks = custom_sentence_splitter.split_text(cleaned_text)

  return custom_chunks


def pdf_folder_reader(file_path):

    pdf_text =""

    file_name = os.path.basename(file_path)
    if file_name.endswith(".pdf"):
        #read the pdf
        with pdfplumber.open(file_path) as file:
            for page in file.pages:
                pdf_text += page.extract_text()
    else:
        #read the pdf
        with open(file_path) as file:
            for page in file.pages:
                pdf_text += page.extract_text()
            
    return pdf_text

def preprocess_text(raw_text):
    # Remove dots
    text_without_dots = raw_text.replace('.', '.')
    
    # Normalize whitespace
    text_normalized = ' '.join(text_without_dots.split())

    return text_normalized


def remove_special_characters(text):
    # Define a regular expression to match any non-alphanumeric character
    pattern = re.compile(r'[^a-zA-Z0-9\s]')
    
    # Use the sub method to replace matched characters with an empty string
    cleaned_text = re.sub(pattern, '', text)
    
    return cleaned_text



def to_markdown(text):
  if isinstance(text, str):
    text = text.replace(".", "*")
    return Markdown(textwrap.indent(text,'> ', predicate=lambda _:True))
  else:
    text = str(text)
    text = text.replace(".", "*")
    return Markdown(textwrap.indent(text,'> ', predicate=lambda _:True))

