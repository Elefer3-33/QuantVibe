"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Lightbulb, Zap } from "lucide-react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

const Search = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  isLoading = false,
}: SearchProps) => {
  const [showExamples, setShowExamples] = useState(false);

  // Example strategies to help users
  const examples = [
    "Buy AAPL when RSI is below 30 and the 50-day moving average crosses above the 200-day moving average",
    "Buy Tesla when MACD crosses above 0",
    "Buy BTC-USD when price is lower than the Bollinger Band lower bound ",
  ];

  const handleExampleClick = (example: string) => {
    setSearchTerm(example);
    setShowExamples(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      console.log("Enter key pressed, calling onSearch");
      onSearch();
    }
  };

  const handleButtonClick = () => {
    console.log(
      "Search button clicked, calling onSearch with term:",
      searchTerm
    );
    onSearch();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg dark:shadow-slate-900/50 p-6 border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="strategy"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Describe your trading strategy in plain English
          </label>

          <button
            onClick={() => setShowExamples(!showExamples)}
            className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <Lightbulb className="h-3 w-3" />
            Examples
          </button>
        </div>

        <div className="relative">
          <textarea
            id="strategy"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="For example: Buy AAPL when RSI is below 30 and the 50-day moving average crosses above the 200-day moving average"
            value={searchTerm}
            onChange={(e) => {
              console.log("Search term changed:", e.target.value);
              setSearchTerm(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleButtonClick}
            disabled={isLoading || !searchTerm.trim()}
            className="absolute bottom-3 right-3 bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-600 dark:to-purple-700 text-white p-2 rounded-full hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-700/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>

        <motion.p
          className="mt-2 text-sm text-slate-500 dark:text-slate-400 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Zap className="h-3 w-3 mr-1 text-indigo-400" />
          <span>
            Our AI will analyze your strategy and backtest it against historical
            data
          </span>
        </motion.p>
      </div>

      {/* Examples dropdown */}
      {showExamples && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-20 mt-2 w-full bg-slate-900/90 backdrop-blur-md rounded-lg shadow-xl border border-slate-700/50 p-3"
        >
          <h4 className="text-sm font-medium text-slate-300 dark:text-slate-300 mb-2 font-orbitron tracking-wider flex items-center">
            <Lightbulb className="h-3 w-3 mr-1 text-yellow-400" />
            Example Strategies
          </h4>
          <ul className="space-y-2">
            {examples.map((example, index) => (
              <li key={index}>
                <motion.button
                  onClick={() => handleExampleClick(example)}
                  className="w-full text-left text-sm p-2 rounded hover:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-300 transition-colors border border-transparent hover:border-slate-700/50"
                  whileHover={{
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    borderColor: "rgba(99, 102, 241, 0.3)",
                    color: "#a5b4fc",
                    textShadow: "0 0 5px rgba(99, 102, 241, 0.5)",
                  }}
                >
                  {example}
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Search;
