from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from backtester import backtest_strategy
from parser import parse_strategy

class StrategyRequest(BaseModel):
    strategy: str

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.post("/backtest")
async def run_backtest(data: StrategyRequest):
    prompt = data.strategy

    parsed = parse_strategy(prompt)
    if "error" in parsed:
        return {"error": parsed["error"]}

    result = backtest_strategy(parsed)
    return result
