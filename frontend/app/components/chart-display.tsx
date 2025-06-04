"use client";

import { motion } from "framer-motion";
import { BarChart2, Zap, Download, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ChartDisplayProps {
  chartData: string;
  ticker: string;
}

export default function ChartDisplay({ chartData, ticker }: ChartDisplayProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent body scroll when fullscreen
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const downloadChart = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${chartData}`;
    link.download = `${ticker}-strategy-chart.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl">
          <motion.div
            className="absolute inset-0 rounded-xl opacity-70"
            style={{
              background:
                "linear-gradient(90deg, #4338ca, #6366f1, #8b5cf6, #6366f1, #4338ca)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-slate-800/30 bg-[size:20px_20px] opacity-30 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5">
            <motion.h4
              className="text-xl font-bold text-white flex items-center font-orbitron tracking-wider"
              animate={{
                textShadow: [
                  "0 0 5px rgba(99, 102, 241, 0.7), 0 0 10px rgba(99, 102, 241, 0.5)",
                  "0 0 7px rgba(99, 102, 241, 0.9), 0 0 14px rgba(99, 102, 241, 0.7)",
                  "0 0 5px rgba(99, 102, 241, 0.7), 0 0 10px rgba(99, 102, 241, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <BarChart2 className="h-5 w-5 mr-2 text-indigo-400" />
              Performance Chart
            </motion.h4>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadChart}
                className="p-2 rounded-lg bg-slate-800/80 text-indigo-400 hover:bg-slate-700/80 border border-slate-700/50"
                title="Download Chart"
              >
                <Download className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-slate-800/80 text-indigo-400 hover:bg-slate-700/80 border border-slate-700/50"
                title="View Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-lg border border-slate-700/50"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Chart image */}
            <div className="relative">
              <img
                src={`data:image/png;base64,${chartData}`}
                alt={`${ticker} Strategy Performance Chart`}
                className="w-full h-auto rounded-lg"
              />

              {/* Animated overlay on hover */}
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end justify-center p-4"
                >
                  <div className="text-center">
                    <p className="text-white font-orbitron text-sm mb-2">
                      {ticker} Strategy Performance
                    </p>
                    <div className="flex justify-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={downloadChart}
                        className="px-3 py-1 rounded-full bg-indigo-600/80 text-white text-xs flex items-center"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleFullscreen}
                        className="px-3 py-1 rounded-full bg-slate-700/80 text-white text-xs flex items-center"
                      >
                        <Maximize2 className="h-3 w-3 mr-1" />
                        Fullscreen
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chart legend */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg border border-slate-700/50 text-xs">
              <div className="flex items-center mb-1">
                <div className="w-3 h-1 bg-blue-400 mr-2 opacity-60"></div>
                <span className="text-slate-300">Price</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                <span className="text-slate-300">Trade Signal</span>
              </div>
            </div>
          </div>

          {/* Power indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex justify-end"
          >
            <motion.div
              className="flex items-center text-xs text-indigo-400/80 px-2 py-1"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap className="h-3 w-3 mr-1" />
              <span>REAL-TIME ANALYSIS</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={`data:image/png;base64,${chartData}`}
              alt={`${ticker} Strategy Performance Chart`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            <div className="absolute top-4 right-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadChart}
                className="p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700/80 border border-slate-700/50"
                title="Download Chart"
              >
                <Download className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700/80 border border-slate-700/50"
                title="Exit Fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Chart legend in fullscreen */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm p-3 rounded-lg border border-slate-700/50 text-sm">
              <div className="flex items-center mb-2">
                <div className="w-4 h-1.5 bg-blue-400 mr-3 opacity-60"></div>
                <span className="text-slate-300">Price</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-4 h-1.5 bg-orange-400 mr-3 opacity-70"></div>
                <span className="text-slate-300">Cumulative Return</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-400 mr-3"></div>
                <span className="text-slate-300">Trade Signal</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
