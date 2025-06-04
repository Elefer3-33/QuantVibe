"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, BookOpen, TrendingUp, AlertTriangle } from "lucide-react";

interface IndicatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  indicator: string;
}

export default function IndicatorModal({
  isOpen,
  onClose,
  indicator,
}: IndicatorModalProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Click handler for fetching the explanation
  const handleButtonClick = () => {
    console.log("Modal state changed:", { isOpen, indicator });
    if (isOpen && indicator) {
      console.log("Fetching explanation for:", indicator);
      fetchIndicatorExplanation(indicator);
    }
  };

  useEffect(() => {
    handleButtonClick();
  }, [isOpen, indicator]);

  const fetchIndicatorExplanation = async (indicator: string) => {
    if (!indicator) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/indicators?name=${encodeURIComponent(indicator)}`
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to fetch indicator explanation: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.explanation) {
        throw new Error("No explanation returned from API");
      }

      setExplanation(data.explanation);
    } catch (err) {
      console.error("Error fetching indicator explanation:", err);
      setError("Failed to load indicator explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get trading tips based on the indicator
  const getTradingTip = (indicator: string) => {
    const tips: Record<string, string> = {
      RSI: "RSI below 30 is typically considered oversold, suggesting a potential buying opportunity. RSI above 70 is typically considered overbought, suggesting a potential selling opportunity.",
      MACD: "A bullish signal occurs when the MACD line crosses above the signal line. A bearish signal occurs when the MACD line crosses below the signal line.",
      MA: "When a shorter-term MA crosses above a longer-term MA, it's often considered a bullish signal. When it crosses below, it's often considered a bearish signal.",
      EMA: "EMAs respond more quickly to price changes than SMAs. This makes them useful for traders who want to see recent price changes reflected more quickly in their analysis.",
      SMA: "The 50-day and 200-day SMAs are widely followed by investors and traders. When the 50-day SMA crosses above the 200-day SMA, it's known as a 'golden cross' (bullish). When it crosses below, it's a 'death cross' (bearish).",
      BB: "When price touches or exceeds the upper band, it may indicate overbought conditions. When it touches or falls below the lower band, it may indicate oversold conditions. When the bands narrow (squeeze), it often precedes a significant price movement.",
    };

    return (
      tips[indicator.toUpperCase()] ||
      "Use this indicator as part of a comprehensive trading strategy, not in isolation."
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-orbitron tracking-wider flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-indigo-400" />
                    {indicator} Indicator
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="min-h-[150px]">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center text-slate-400 py-8">
                      <Loader2 className="h-8 w-8 animate-spin mb-2" />
                      <p>Generating explanation...</p>
                    </div>
                  ) : error ? (
                    <div className="text-red-400 text-center py-8">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                      <p>{error}</p>
                    </div>
                  ) : (
                    <div className="text-slate-300 space-y-4">
                      <p className="leading-relaxed">{explanation}</p>
                      <div className="mt-4 p-3 bg-indigo-900/30 border border-indigo-700/30 rounded-lg">
                        <p className="text-sm text-indigo-300 flex">
                          <TrendingUp className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <span className="font-semibold">Trading tip:</span>{" "}
                            {getTradingTip(indicator)}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleButtonClick}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  Refresh Explanation
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
