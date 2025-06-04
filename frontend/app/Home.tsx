"use client";

import { useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import StrategySummary from "./components/strategy-summary";
import ResultsDisplay from "./components/results-display";

interface Condition {
  indicator: string;
  operator: string;
  value: string | number;
}

interface StrategySummaryData {
  ticker: string;
  action: string;
  conditions: Condition[];
  summaryDetail?: string;
  score?: number;
}

interface BacktestResults {
  return: number;
  win_rate: number;
  trades: number;
  strategySummary: StrategySummaryData;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [backtestResults, setBacktestResults] =
    useState<BacktestResults | null>(null);

  const API_BASE_URL = "http://localhost:8000";

  // Direct approach without using searchTriggered state
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setErrorMessage("Please enter a valid trading strategy.");
      return;
    }

    console.log("Initiating backtest with strategy:", searchTerm);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/backtest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strategy: searchTerm }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Backtest results:", data);

      setIsLoading(false);

      if (data.error) {
        setErrorMessage(`Error: ${data.error}`);
      } else {
        setBacktestResults(data);
      }
    } catch (error) {
      console.error("Error fetching backtest results:", error);
      setIsLoading(false);
      setErrorMessage(
        "An error occurred while fetching the results. Please check your connection and try again."
      );
    }
  };

  return (
    <>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./chart.png" alt="Trading Chart" />
          <h1>
            {" "}
            Translate. Backtest.
            <p>
              Trade <span className="text-gradient">Smarter</span>
            </p>
          </h1>
        </header>

        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <section className="results">
          <h2 className="mt-[20px] mb-6">Your trading strategy results</h2>

          {/* Loading indicator with spinner */}
          {isLoading && <Spinner />}

          {/* Error message */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          {/* Results layout - using the custom components */}
          {backtestResults && (
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Strategy Summary Box */}
                <div className="flex-1">
                  {backtestResults.strategySummary && (
                    <StrategySummary
                      strategySummary={backtestResults.strategySummary}
                    />
                  )}
                </div>

                {/* Results Box */}
                <div className="flex-1">
                  <ResultsDisplay
                    returnValue={backtestResults.return}
                    winRate={backtestResults.win_rate}
                    trades={backtestResults.trades}
                  />
                </div>
              </div>

              {/* Graph Section */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-4 text-dark-100 dark:text-white">
                  Performance Chart
                </h3>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 h-[300px] flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-300">
                    Chart visualization will appear here. The backend currently
                    doesn't return chart data.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
