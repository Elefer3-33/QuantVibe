"use client";

import { motion } from "framer-motion";

export default function LoadingAnimation() {
  const colors = [
    "rgb(6, 182, 212)", // cyan-500
    "rgb(168, 85, 247)", // purple-500
    "rgb(236, 72, 153)", // pink-500
    "rgb(168, 85, 247)", // purple-500
    "rgb(6, 182, 212)", // cyan-500
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        {/* Glowing background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl"
        />

        {/* Circular loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: colors[index % colors.length],
                transform: `rotate(${index * 45}deg) translateY(-20px)`,
              }}
            />
          ))}
        </div>

        {/* Center pulse */}
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.7, 1, 0.7],
            background: [
              "linear-gradient(to right, rgb(6, 182, 212), rgb(168, 85, 247))",
              "linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153))",
              "linear-gradient(to right, rgb(6, 182, 212), rgb(168, 85, 247))",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-slate-600 dark:text-slate-300 font-medium"
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Analyzing your strategy...
        </motion.span>
      </motion.div>
    </div>
  );
}
