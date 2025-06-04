"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Zap,
  Shield,
  Cpu,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Condition {
  indicator: string;
  operator: string;
  value: string | number;
}

interface StrategySummaryProps {
  strategySummary: {
    ticker: string;
    action: string;
    conditions: Condition[];
  };
}

export default function StrategySummary({
  strategySummary,
}: StrategySummaryProps) {
  const { ticker, action, conditions } = strategySummary;
  const [hoveredCondition, setHoveredCondition] = useState<number | null>(null);
  const [glitchTicker, setGlitchTicker] = useState(false);

  // Glitch effect for ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTicker(true);
      setTimeout(() => setGlitchTicker(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(67, 56, 202, 0.4) 0%, rgba(79, 70, 229, 0.2) 50%, rgba(99, 102, 241, 0.3) 100%)",
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

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

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
            Strategy Blueprint
          </motion.h4>

          <motion.div
            className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 flex items-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Zap className="h-3 w-3 mr-1 text-indigo-300" />
            AI Analyzed
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center"
          >
            <div className="w-24 text-sm text-indigo-300 font-medium uppercase tracking-wider font-orbitron">
              TICKER
            </div>
            <div className="flex-1">
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold bg-indigo-900/60 text-white border border-indigo-700/50 font-orbitron tracking-wider"
                animate={
                  glitchTicker
                    ? {
                        x: [0, -2, 3, -1, 0],
                        opacity: [1, 0.8, 1, 0.9, 1],
                        textShadow: [
                          "0 0 5px rgba(99, 102, 241, 0.7), 0 0 10px rgba(99, 102, 241, 0.5)",
                          "0 0 7px #ff00ff, 0 0 14px #ff00ff",
                          "0 0 5px rgba(99, 102, 241, 0.7), 0 0 10px rgba(99, 102, 241, 0.5)",
                        ],
                      }
                    : {
                        textShadow:
                          "0 0 5px rgba(99, 102, 241, 0.7), 0 0 10px rgba(99, 102, 241, 0.5)",
                      }
                }
                transition={{ duration: 0.2 }}
              >
                {ticker}
                <motion.div
                  className="ml-2 h-2 w-2 rounded-full bg-indigo-400"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <div className="w-24 text-sm text-indigo-300 font-medium uppercase tracking-wider font-orbitron">
              ACTION
            </div>
            <div className="flex-1">
              {action === "buy" ? (
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-orbitron tracking-wider"
                  whileHover={{ scale: 1.03 }}
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(16, 185, 129, 0.3), 0 0 10px rgba(16, 185, 129, 0.2)",
                      "0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)",
                      "0 0 5px rgba(16, 185, 129, 0.3), 0 0 10px rgba(16, 185, 129, 0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  BUY
                  <motion.div
                    className="ml-2"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Shield className="h-4 w-4 text-emerald-400/70" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold bg-red-500/20 text-red-400 border border-red-500/30 font-orbitron tracking-wider"
                  whileHover={{ scale: 1.03 }}
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(239, 68, 68, 0.3), 0 0 10px rgba(239, 68, 68, 0.2)",
                      "0 0 10px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)",
                      "0 0 5px rgba(239, 68, 68, 0.3), 0 0 10px rgba(239, 68, 68, 0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <TrendingDown className="h-5 w-5 mr-2" />
                  SELL
                  <motion.div
                    className="ml-2"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Shield className="h-4 w-4 text-red-400/70" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-sm text-indigo-300 font-medium mb-3 uppercase tracking-wider font-orbitron flex items-center">
              <Cpu className="h-3 w-3 mr-1" />
              CONDITIONS
            </div>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHoveredCondition(index)}
                  onMouseLeave={() => setHoveredCondition(null)}
                  className="relative group"
                >
                  <motion.div
                    className={`
                    relative z-10 p-3 rounded-lg transition-all duration-300
                    ${
                      hoveredCondition === index
                        ? "bg-indigo-900/90 border border-indigo-500/50"
                        : "bg-indigo-900/50 border border-indigo-700/50"
                    }
                  `}
                    whileHover={{
                      boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                      y: -2,
                    }}
                    animate={
                      hoveredCondition === index
                        ? {
                            boxShadow: [
                              "0 0 5px rgba(99, 102, 241, 0.3), 0 0 10px rgba(99, 102, 241, 0.2)",
                              "0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)",
                              "0 0 5px rgba(99, 102, 241, 0.3), 0 0 10px rgba(99, 102, 241, 0.2)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat:
                        hoveredCondition === index
                          ? Number.POSITIVE_INFINITY
                          : 0,
                    }}
                  >
                    <div className="flex items-center">
                      <div className="flex-1 flex items-center">
                        <span className="font-orbitron text-indigo-300 mr-2 font-medium tracking-wider">
                          {condition.indicator}
                        </span>
                        <span className="text-white mx-2 font-light">
                          {condition.operator}
                        </span>
                        <span className="font-orbitron text-purple-300 font-medium tracking-wider">
                          {condition.value}
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          x: hoveredCondition === index ? [0, 5, 0] : 0,
                          opacity: hoveredCondition === index ? 1 : 0.5,
                        }}
                        transition={{
                          duration: 1,
                          repeat:
                            hoveredCondition === index
                              ? Number.POSITIVE_INFINITY
                              : 0,
                        }}
                      >
                        <ArrowRight className="h-4 w-4 text-indigo-400" />
                      </motion.div>
                    </div>

                    {/* Animated highlight line */}
                    {hoveredCondition === index && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                  </motion.div>

                  {/* Animated highlight on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      opacity: hoveredCondition === index ? [0.1, 0.2, 0.1] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Risk indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center text-xs text-amber-400/80 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20"
          whileHover={{
            boxShadow: "0 0 10px rgba(245, 158, 11, 0.3)",
            scale: 1.01,
          }}
        >
          <AlertTriangle className="h-3 w-3 mr-2" />
          <span>Past performance is not indicative of future results</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
