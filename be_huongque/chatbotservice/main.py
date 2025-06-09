from fastapi import FastAPI, Request
from pydantic import BaseModel

from chat import generate_response


app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    answer = generate_response(request.message)
    return {"response": answer}
