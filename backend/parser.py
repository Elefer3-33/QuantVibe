from openai import OpenAI
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = '''
You are a strategy parsing assistant. You receive a plain-English trading strategy and return a JSON object formatted as:
{
    "ticker": "AAPL",
    "action": "buy",
    "conditions": [
        {"indicator": "RSI", "operator": "<", "value": 30}
    ]
}

The ticker should be the correct one reported on Yahoo Finance. For example, if the stock is Unicredit, the ticker should be UCG.MI, if it's Apple, the ticker should be AAPL.

Indicators can include RSI, MA50, MA100, MA200, ATR, MACD, BB_upper, BB_lower, Volume, Price.
Operators can include comparison (<, >, <=, >=, ==) or crossovers (crosses above, crosses below).


You must automatically identify and replace any stock name (like "Unicredit", "Apple", etc.) with its corresponding ticker from Yahoo Finance. 

Only return the JSON object. If the input is invalid or unclear, respond with:
{"error": "Invalid or unclear strategy."}
'''

def parse_strategy(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Get the content from the response
    content = response.choices[0].message.content

    # Try to parse the response as JSON
    try:
        parsed = json.loads(content)
        if "error" in parsed:
            return parsed
        return parsed
    except json.JSONDecodeError:
        return {"error": "Could not parse strategy response."}
