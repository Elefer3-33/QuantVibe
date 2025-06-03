# test_backtester.py

from backtester import backtest_strategy

# Example strategy input
strategy = {
    "ticker": "TSLA",
    "action": "buy",
    "conditions": [
        {"indicator": "RSI", "operator": "<", "value": "30"}
    ]
}

# Run the backtest
result = backtest_strategy(strategy)

# Print the result
print("Total Return: ", result["return"], "%")
print("Win Rate: ", result["win_rate"], "%")
print("Number of Trades: ", result["trades"])
print("Strategy Summary: ", result["strategySummary"])


