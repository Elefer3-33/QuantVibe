import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from finta import TA
import base64
from io import BytesIO

def apply_indicators(df):
    df['Price'] = df['Close'].values.flatten()
    df['RSI'] = TA.RSI(df['Close'].values.flatten(), timeperiod=14)
    df['MA50'] = df['Close'].rolling(window=50).mean()
    df['MA100'] = df['Close'].rolling(window=100).mean()
    df['MA200'] = df['Close'].rolling(window=200).mean()
    df['ATR'] = TA.ATR(df['High'].values.flatten(), df['Low'].values.flatten(), df['Close'].values.flatten(), timeperiod=14)
    df['MACD'], _, _ = TA.MACD(df['Close'].values.flatten())
    df ['typical_price'] = (df['High'] + df['Low'] + df['Close']) / 3
    upper, middle, lower = TA.BBANDS(df['typical_price'], timeperiod=20, nbdevup=2, nbdevdn=2, matype=0)
    df['BB_upper'] = upper
    df['BB_middle'] = middle
    df['BB_lower'] = lower

    return df

def check_condition(df, i, condition):
    indicator = condition['indicator']
    op = condition['operator']
    val = condition['value']

    try:
        left_now = df[indicator].iloc[i]
        left_prev = df[indicator].iloc[i-1] if i > 0 else None

        if isinstance(val, str) and val in df.columns:
            right_now = float(df[val].iloc[i])
            right_prev = float(df[val].iloc[i-1]) if i > 0 else None
        else:
            right_now = float(val)
            right_prev = float(val)

        if op == '>':
            return left_now > right_now
        elif op == '<':
            return left_now < right_now
        elif op == '>=':
            return left_now >= right_now
        elif op == '<=':
            return left_now <= right_now
        elif op == '==':
            return left_now == right_now
        elif op == 'crosses above':
            return left_prev is not None and left_prev <= right_prev and left_now > right_now
        elif op == 'crosses below':
            return left_prev is not None and left_prev >= right_prev and left_now < right_now
    except Exception as e:
        print(f"Error in condition: {condition}, error: {e}")
        return False

    return False



def backtest_strategy(strategy):
    ticker = strategy["ticker"]
    action = strategy["action"]
    conditions = strategy["conditions"]

    df_full = yf.download(ticker, end="2024-12-31", auto_adjust=False)  
    df_full = apply_indicators(df_full)  
    df = df_full.loc["2019-01-01":"2024-12-31"].copy()  

    df['Signal'] = False

    for i in range(1, len(df)):
        if all(check_condition(df, i, cond) for cond in conditions):
            df.at[df.index[i], 'Signal'] = True

    df['Position'] = 0
    df.loc[df['Signal'], 'Position'] = 1 if action == 'buy' else -1
    df['Position'] = df['Position'].shift(1).fillna(0)

    df['Return'] = df['Close'].pct_change()
    df['StrategyReturn'] = df['Return'] * df['Position']

    cumulative_return = (1 + df['StrategyReturn']).cumprod() - 1
    total_return = cumulative_return.iloc[-1]
    win_rate = (df['StrategyReturn'] > 0).sum() / df['Signal'].sum() if df['Signal'].sum() > 0 else 0
    num_trades = int(df['Signal'].sum())

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(df['Close'], label='Price', color='blue', alpha=0.6)
    ax.scatter(df[df['Signal']].index, df['Close'][df['Signal']],
               marker='^' if action == 'buy' else 'v', color='green', label='Trade Signal')
    ax.set_title(f"{ticker} Strategy Performance")
    ax.set_ylabel("Price")
    ax.legend()

    img_bytes = BytesIO()
    fig.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    chart_base64 = base64.b64encode(img_bytes.read()).decode('utf-8')

    return {
        "return": round(total_return * 100, 2),
        "win_rate": round(win_rate * 100, 2),
        "trades": num_trades,
        "chart": chart_base64,
        "strategySummary": strategy  
    }
