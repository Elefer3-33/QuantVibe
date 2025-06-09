"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BarChart3, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import StrategySummary from "../components/strategy-summary";
import ResultsDisplay from "../components/results-display";
import ThemeToggle from "../components/theme-toggle";
import ChartDisplay from "../components/chart-display";
import HelpSection from "../components/help-section";

interface Condition {
  indicator: string;
  operator: string;
  value: string | number;
}

interface StrategySummaryData {
  ticker: string;
  action: string;
  conditions: Condition[];
}

interface BacktestResults {
  return: number;
  win_rate: number;
  trades: number;
  strategySummary: StrategySummaryData;
  chart?: any;
}


export default function StrategyPage() {
  const router = useRouter();
  const [strategy, setStrategy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BacktestResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; speed: number }>
  >([]);

  // Generate random particles for the background
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
    }));
    setParticles(newParticles);
  }, []);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const handleSubmit = async () => {
    if (!strategy.trim()) {
      setError("Please enter a strategy to test");
      return;
    }

    setIsLoading(true);
    setError(null);
    // Clear previous results to ensure UI updates
    setResults(null);

    try {
      console.log("Sending strategy to backend:", strategy);

      // Make the actual API call to your Python backend
      const response = await fetch(`${backendUrl}/backtest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add cache control headers to prevent caching
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify({ strategy: strategy }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received results from backend:", data);

      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Create a new object to ensure React detects the state change
      setResults({
        return: data.return,
        win_rate: data.win_rate,
        trades: data.trades,
        strategySummary: data.strategySummary,
        chart: data.chart,
      });

      setIsLoading(false);

      // Scroll to results after they load
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError(
        "Failed to connect to the backend server. Please make sure the backend is running and try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-y-auto"
      style={{ background: "#0a0118" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
              opacity: [0.2, 0.5, 0.2],
              boxShadow: [
                "0 0 5px rgba(99, 102, 241, 0.3)",
                "0 0 10px rgba(99, 102, 241, 0.5)",
                "0 0 5px rgba(99, 102, 241, 0.3)",
              ],
            }}
            transition={{
              duration: 5 / particle.speed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-slate-800/30 bg-[size:30px_30px] opacity-20 pointer-events-none" />

      {/* Animated gradient lines */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ maxHeight: "60vh" }}
      >
        <motion.div
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
          style={{ top: "20%" }}
          animate={{
            left: ["-100%", "100%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          style={{ top: "40%" }}
          animate={{
            left: ["-100%", "100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"
          style={{ top: "60%" }}
          animate={{
            left: ["-100%", "100%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 10,
          }}
        />
      </div>

      {/* Header */}
      {/* Fix the header layout to properly center the QuantVibe title */}
      <header className="relative z-10 bg-gradient-to-r from-slate-900/90 via-indigo-900/80 to-slate-900/90 backdrop-blur-md text-white py-8 border-b border-indigo-700/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => router.push("/")}
              className="flex items-center text-slate-300 hover:text-white transition-colors bg-transparent"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </motion.button>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
              <div className="relative">
                <BarChart3 className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 dark:from-indigo-300 dark:to-purple-400 mr-2" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    rotate: [0, 15, 0, -15, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </motion.div>
              </div>
              <motion.h1
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-400 dark:to-pink-400 font-orbitron tracking-wider"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(99, 102, 241, 0.7), 0 0 10px rgba(99, 102, 241, 0.5)",
                    "0 0 7px rgba(139, 92, 246, 0.9), 0 0 14px rgba(139, 92, 246, 0.7)",
                    "0 0 5px rgba(99, 102, 241, 0.7), 0 0 10px rgba(99, 102, 241, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                QuantVibe
              </motion.h1>
            </div>
            <ThemeToggle />
          </div>

          <div className="text-center mt-12 mb-8">
            <motion.h2
              className="text-4xl font-black mb-2 font-orbitron tracking-wider"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                Your Trading Strategy Assistant
              </span>
            </motion.h2>
            <motion.p
              className="text-slate-300 mt-2 max-w-2xl mx-auto flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Describe your strategy in plain English and our AI will backtest
              it for you
            </motion.p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-20 relative z-10">
        {/* Strategy Input */}
        <Search
          searchTerm={strategy}
          setSearchTerm={setStrategy}
          onSearch={handleSubmit}
          isLoading={isLoading}
        />
        {/* Help Section */}
        <HelpSection />

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-500/10 dark:bg-red-900/20 border border-red-500/20 dark:border-red-700/30 rounded-lg text-red-400 flex items-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="mr-2"
            >
              ⚠️
            </motion.div>
            {error}
          </motion.div>
        )}

        {/* Loading Animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="my-12 flex justify-center"
            >
              <Spinner />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {results && !isLoading && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 space-y-8"
            >
              <motion.h3
                className="text-3xl font-bold text-white flex items-center font-orbitron tracking-wider"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-400 dark:to-pink-400">
                  Strategy Analysis Results
                </span>
                <motion.div
                  animate={{
                    rotate: [0, 15, 0, -15, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  className="ml-2"
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </motion.div>
              </motion.h3>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Strategy Summary */}
                <div className="flex-1">
                  <StrategySummary strategySummary={results.strategySummary} />
                </div>

                {/* Results Display */}
                <div className="flex-1">
                  <ResultsDisplay
                    returnValue={results.return}
                    winRate={results.win_rate}
                    trades={results.trades}
                  />
                </div>
              </div>
              {/* Performance Chart */}
              {results && results.chart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 relative z-20"
                >
                  {/* This z-20 ensures the chart is above any background animations */}
                  <ChartDisplay
                    chartData={results.chart}
                    ticker={results.strategySummary.ticker}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-20"></div>
      </main>
    </div>
  );
}
