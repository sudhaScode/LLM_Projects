import json
#import the finetuned modal 
from src.finetunedmodal import index, query_engine, update_index
import time

#import the fastapi
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.utility import to_markdown




# create an instance of FastAPI
app = FastAPI()
# Allow only the specified origin (replace with your frontend's actual origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8088"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# implement the HTTP request using the decorators 
@app.get("/")
async def root():
    return {"LLM": "Chat with customized llm"}



class Item(BaseModel):
    query: str

# Create an instance without providing a default value
#item_instance = Item(query="Please conclude the IPO details of the company?")
"""   
@app.post("/query")
async def context_chat(item: Item):
    #send the query to llm
    #message = payload.get("message")
    message = item.query
    response = query_engine.query(message)
    
    response = {"bot_reply": response}
    return response

"""
@app.post("/query")
async def context_chat(payload : dict)  -> dict:
    #send the query to llm
    message = payload.get("message")
    response = query_engine.query(message)
    
    response = {"bot_reply": response}
    return response
    
max_file_size_bytes = 10 * 1024 * 1024

@app.post("/upload")
async def upload_context(file: UploadFile = File(...)):
    
    try:
        
        print("Invoked")
        file_path =f"C:/Users/SUBOMMAS/LLM_Projects/HRBOT/resources/uploads/{file.filename}"
        print(file_path)
        with open(file_path, "wb") as f:
            f.write(file.file.read())

        # Call the method to update the vector store index
        update_index(file_path=file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Upload successful"}

@app.get("/chat")   
async def get_chat():
    item_instance = Item(query ="Please conclude the IPO details of the company?")
    response = await context_chat(item_instance)
    
    return response.response






#uvicorn main:app --reload
