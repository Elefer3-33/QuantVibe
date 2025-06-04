"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Percent,
  Activity,
  BarChart2,
  Zap,
  Cpu,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ResultsDisplayProps {
  returnValue: number;
  winRate: number;
  trades: number;
}

export default function ResultsDisplay({
  returnValue,
  winRate,
  trades,
}: ResultsDisplayProps) {
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 3000);
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
          "linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(167, 139, 250, 0.3) 100%)",
      }}
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl">
        <motion.div
          className="absolute inset-0 rounded-xl opacity-70"
          style={{
            background:
              "linear-gradient(90deg, #7c3aed, #8b5cf6, #a78bfa, #8b5cf6, #7c3aed)",
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
            className="absolute w-1 h-1 rounded-full bg-purple-400/50"
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
                "0 0 5px rgba(139, 92, 246, 0.7), 0 0 10px rgba(139, 92, 246, 0.5)",
                "0 0 7px rgba(139, 92, 246, 0.9), 0 0 14px rgba(139, 92, 246, 0.7)",
                "0 0 5px rgba(139, 92, 246, 0.7), 0 0 10px rgba(139, 92, 246, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Activity className="h-5 w-5 mr-2 text-purple-400" />
            Performance Metrics
          </motion.h4>

          <motion.div
            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/50 flex items-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <BarChart2 className="h-3 w-3 mr-1 text-purple-300" />
            Historical Data
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Return */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
            whileHover={{ scale: 1.03, zIndex: 10 }}
          >
            <motion.div
              className="p-4 flex flex-col items-center justify-center bg-slate-900/80 rounded-lg h-full border border-slate-700/50"
              animate={
                glitchEffect
                  ? {
                      x: [0, -2, 3, -1, 0],
                      opacity: [1, 0.8, 1, 0.9, 1],
                    }
                  : {}
              }
              whileHover={{
                boxShadow:
                  returnValue >= 0
                    ? "0 0 20px rgba(16, 185, 129, 0.4)"
                    : "0 0 20px rgba(239, 68, 68, 0.4)",
                borderColor:
                  returnValue >= 0
                    ? "rgba(16, 185, 129, 0.5)"
                    : "rgba(239, 68, 68, 0.5)",
              }}
            >
              <div className="text-sm text-slate-400 mb-1 flex items-center uppercase tracking-wider font-orbitron">
                <TrendingUp className="h-4 w-4 mr-1" />
                RETURN
              </div>

              <div className="relative">
                <motion.div
                  className={`text-2xl font-bold font-orbitron tracking-wider ${
                    returnValue >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                  animate={{
                    textShadow:
                      returnValue >= 0
                        ? [
                            "0 0 5px rgba(16, 185, 129, 0.7), 0 0 10px rgba(16, 185, 129, 0.5)",
                            "0 0 7px rgba(16, 185, 129, 0.9), 0 0 14px rgba(16, 185, 129, 0.7)",
                            "0 0 5px rgba(16, 185, 129, 0.7), 0 0 10px rgba(16, 185, 129, 0.5)",
                          ]
                        : [
                            "0 0 5px rgba(239, 68, 68, 0.7), 0 0 10px rgba(239, 68, 68, 0.5)",
                            "0 0 7px rgba(239, 68, 68, 0.9), 0 0 14px rgba(239, 68, 68, 0.7)",
                            "0 0 5px rgba(239, 68, 68, 0.7), 0 0 10px rgba(239, 68, 68, 0.5)",
                          ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {returnValue >= 0 ? "+" : ""}
                  {returnValue}%
                </motion.div>

                {/* Animated underline */}
                <motion.div
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full ${
                    returnValue >= 0 ? "bg-emerald-400/70" : "bg-red-400/70"
                  }`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>

              {/* Animated corner indicator */}
              <motion.div
                className={`absolute top-1 right-1 h-2 w-2 rounded-full ${
                  returnValue >= 0 ? "bg-emerald-400" : "bg-red-400"
                }`}
                animate={{
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>

          {/* Win Rate */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
            whileHover={{ scale: 1.03, zIndex: 10 }}
          >
            <motion.div
              className="p-4 flex flex-col items-center justify-center bg-slate-900/80 rounded-lg h-full border border-slate-700/50"
              animate={
                glitchEffect
                  ? {
                      x: [0, -2, 3, -1, 0],
                      opacity: [1, 0.8, 1, 0.9, 1],
                    }
                  : {}
              }
              whileHover={{
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                borderColor: "rgba(139, 92, 246, 0.5)",
              }}
            >
              <div className="text-sm text-slate-400 mb-1 flex items-center uppercase tracking-wider font-orbitron">
                <Percent className="h-4 w-4 mr-1" />
                WIN RATE
              </div>

              <div className="relative">
                <motion.div
                  className="text-2xl font-bold font-orbitron tracking-wider text-purple-400"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(139, 92, 246, 0.7), 0 0 10px rgba(139, 92, 246, 0.5)",
                      "0 0 7px rgba(139, 92, 246, 0.9), 0 0 14px rgba(139, 92, 246, 0.7)",
                      "0 0 5px rgba(139, 92, 246, 0.7), 0 0 10px rgba(139, 92, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {winRate}%
                </motion.div>

                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-purple-400/70 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </div>

              {/* Animated corner indicator */}
              <motion.div
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-400"
                animate={{
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>

          {/* Trades */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
            whileHover={{ scale: 1.03, zIndex: 10 }}
          >
            <motion.div
              className="p-4 flex flex-col items-center justify-center bg-slate-900/80 rounded-lg h-full border border-slate-700/50"
              animate={
                glitchEffect
                  ? {
                      x: [0, -2, 3, -1, 0],
                      opacity: [1, 0.8, 1, 0.9, 1],
                    }
                  : {}
              }
              whileHover={{
                boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)",
                borderColor: "rgba(236, 72, 153, 0.5)",
              }}
            >
              <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider font-orbitron flex items-center">
                <Cpu className="h-3 w-3 mr-1" />
                TRADES
              </div>

              <div className="relative">
                <motion.div
                  className="text-2xl font-bold font-orbitron tracking-wider text-pink-400"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(236, 72, 153, 0.7), 0 0 10px rgba(236, 72, 153, 0.5)",
                      "0 0 7px rgba(236, 72, 153, 0.9), 0 0 14px rgba(236, 72, 153, 0.7)",
                      "0 0 5px rgba(236, 72, 153, 0.7), 0 0 10px rgba(236, 72, 153, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {trades}
                </motion.div>

                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-pink-400/70 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
              </div>

              {/* Animated corner indicator */}
              <motion.div
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-pink-400"
                animate={{
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
