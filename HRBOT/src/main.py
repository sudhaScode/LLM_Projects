#import the fastapi

from fastapi import FastAPI

# create an instance of FastAPI
app = FastAPI()

# implement the HTTP request using the decorators 

@app.get("/")
async def retreive():
    return {"LLM": "Gemini-Pro"}
    
