# QndABOT- similarity search

  The objective is to fine-tuning the llm model with required trainig data and levaraging the model to answer user Question on the trained data.

  Use Case - Implementing Similarity search. [best practice - checking rhe .gitignore file ]

## Table of Contents

- Project Workflow
- Requirements
- Installation
- Configuration
- Troubleshooting

## Project Workflow
  1. Configre the **OpenAI API**
  2. create the chain **load_qa_chain** with **langchain.chains** module
  3. configure the embedding with **OpenAIembeddings** module
  4. Read the pdf document by the **PyPDF2.PdfReader** module
  5. Split the text into chucks by **langchain.text_splitter - CharacterTextSplitter** module 
  6. create a **vectorstore** by embeding the chucks into the **FAISS** vector database by **langchain.vectorstores** module
  7. develop a question
  8. implement the similarity search in vectorstore with question
  9. run the search with llm

## Requirements
1. Environment 
   **Download and Install the latest version of Anaconda or Miniconda [package and virtual environments manager]. Add the path to environment varibales, And check the version of conda `conda -/-version`**
   - Set up 
     - Open the terminal/Gitbash and direct to the target folder (vs code-prefered)
     - create the conda environment - `conda create -p environment python==3.10.0`
     - activate the environment - `conda activate ./environment`
2. API_KEY
     - Create the `.env` file under the project directory
     - paste the API KEY of openAI in format of - `OPENAI_API_KEY = "VALUE"` 

## Installation
   **`requirements.txt` file manages the installation of required packages**
   - install all required packages - `pip install -r requirements.txt` 
   The common required packages used in LLM projects are:
       - openai
       - langchain
       - PyPDF2
       - ipykernel
       - langchain-openai
       - pyhton-dotenv
       - conda-forge
       - jupyter

## Configuration 
 **the configuration and development of project is done in `ipynb` file(created under root directory)**
  1. Load the environment - run the following code
    - `from dotenv import load_dotenv`
    - `load_dotenv()`
    **the output will True if environmets loaded sucessfully, if not false. try to resolve the .env conetent must be in format `KEY="VALUE`**
  2. Retrieve the API key from .env file
    - `import os`
    - `OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")`
  3. Import Modules
  **import all necessary modules, if nay errors update the packages or use alternative modules if any modules were depreceated.** 
   - `from PyPDF2 import PdfReader`
   - `from langchain.embeddings.openai import OpenAIEmbeddings`
   - `from langchain.text_splitter import CharacterTextSplitter`
   - `from langchain.vectorstores import FAISS`
   - `from langchain_openai import OpenAIEmbeddings`
   - `from langchain.chains.question_answering import load_qa_chain`
   - `from langchain_openai import OpenAI`
  4. Configure OPENAI
  **the llm must be authehncate with API to comminicate. Authenticate the API with provided key `OPENAI_API_KEY`**
   - `llm = OpenAi(api_key = OPENAI_API_KEY)` - it configures the OpenAI

**For other project implementation workflow head to ipynb file in root directory**
   
    
## Troubleshooting
 - to troublesoot langchain related errors follow the [langchain documentation](https://python.langchain.com/docs/get_started/introduction)

 - to troubleshoot OPENAI related errors follow teh [openai documentation](https://platform.openai.com/docs/introduction)