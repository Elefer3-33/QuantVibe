"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  BarChart2,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function HelpSection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-6 mb-8">
      <motion.button
        onClick={toggleHelp}
        className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-900/80 backdrop-blur-md border border-indigo-700/30 text-white hover:bg-slate-800/80 transition-colors"
        whileHover={{ boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)" }}
      >
        <div className="flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-indigo-400" />
          <span className="font-orbitron tracking-wider">
            Strategy Help & Guidelines
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-indigo-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-indigo-400" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-6 rounded-lg bg-slate-900/60 backdrop-blur-md border border-indigo-700/30 text-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Indicators Section */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white font-orbitron tracking-wider">
                      Available Indicators
                    </h3>
                  </div>
                  <ul className="space-y-2 ml-7">
                    <li className="list-disc">
                      <span className="font-semibold text-indigo-300">
                        RSI (Relative Strength Index)
                      </span>{" "}
                      - Values typically between 0-100, with 30 and below
                      considered oversold, 70 and above considered overbought.
                      It is considered over a period of 14 days
                    </li>
                    <li className="list-disc">
                      <span className="font-semibold text-indigo-300">
                        MACD
                      </span>{" "}
                      - Moving Average Convergence Divergence, consisting of
                      MACD line, signal line, and histogram
                    </li>
                    <li className="list-disc">
                      <span className="font-semibold text-indigo-300">
                        Moving Averages
                      </span>{" "}
                      - MA with periods like 50, 100, and 200 days
                    </li>
                    <li className="list-disc">
                      <span className="font-semibold text-indigo-300">
                        Bollinger Bands
                      </span>{" "}
                      - Upper band, lower band, and middle band (20-day SMA)
                    </li>
                    <li className="list-disc">
                      <span className="font-semibold text-indigo-300">
                        Price
                      </span>{" "}
                      - Open, high, low, close values
                    </li>
                  </ul>
                </div>

                {/* Time Periods & Other Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-4">
                      <Clock className="h-5 w-5 mr-2 text-indigo-400" />
                      <h3 className="text-lg font-bold text-white font-orbitron tracking-wider">
                        Time Periods
                      </h3>
                    </div>
                    <ul className="space-y-2 ml-7">
                      <li className="list-disc">
                        <span className="font-semibold text-indigo-300">
                          Default backtest period:
                        </span>{" "}
                        All available data is downloaded for the ticker. The
                        strategy is analyzed and implemented over the last 5
                        years period, from Jan 2019 to Dec 2024.
                      </li>
                      <li className="list-disc">
                        <span className="font-semibold text-indigo-300">
                          Available timeframes:
                        </span>{" "}
                        Daily (default), weekly, monthly
                      </li>
                      <li className="list-disc">
                        <span className="font-semibold text-indigo-300">
                          Data source:
                        </span>{" "}
                        Historical market data from reliable financial APIs
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <Info className="h-5 w-5 mr-2 text-indigo-400" />
                      <h3 className="text-lg font-bold text-white font-orbitron tracking-wider">
                        Strategy Guidelines
                      </h3>
                    </div>
                    <ul className="space-y-2 ml-7">
                      <li className="list-disc">
                        <span className="font-semibold text-indigo-300">
                          Be specific
                        </span>{" "}
                        - Include ticker symbol, action (buy/sell), and clear
                        conditions
                      </li>
                      <li className="list-disc">
                        <span className="font-semibold text-indigo-300">
                          Supported tickers:
                        </span>{" "}
                        Major stocks (AAPL, MSFT, TSLA, etc.), indices (SPY,
                        QQQ), and cryptocurrencies (BTC-USD, ETH-USD)
                      </li>
                      <li className="list-disc">
                        <span className="font-semibold text-indigo-300">
                          Combine indicators
                        </span>{" "}
                        - For more robust strategies, use multiple indicators
                        (e.g., RSI + Moving Average)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <motion.div
                className="mt-6 p-3 rounded-lg bg-amber-900/10 border border-amber-700/30 flex items-start"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(245, 158, 11, 0)",
                    "0 0 10px rgba(245, 158, 11, 0.2)",
                    "0 0 0px rgba(245, 158, 11, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="h-5 w-5 mr-2 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200">
                  <span className="font-semibold">Disclaimer:</span> Past
                  performance is not indicative of future results. This tool is
                  for educational purposes only and should not be considered
                  financial advice. Always do your own research before making
                  investment decisions.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
