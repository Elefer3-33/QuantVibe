from backtester import backtest_strategy

strategy = {
    "ticker": "AAPL",
    "action": "buy",
    "conditions": [
        {"indicator": "RSI", "operator": "<", "value": 30}
    ]
}

result = backtest_strategy(strategy)
print(result["return"], result["win_rate"], result["trades"])
