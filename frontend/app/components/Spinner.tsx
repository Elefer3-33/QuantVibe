"use client";

import { motion } from "framer-motion";

const Spinner = () => {
  const colors = [
    "rgb(6, 182, 212)", // cyan-500
    "rgb(168, 85, 247)", // purple-500
    "rgb(236, 72, 153)", // pink-500
    "rgb(168, 85, 247)", // purple-500
    "rgb(6, 182, 212)", // cyan-500
  ];

  return (
    <div className="flex flex-col items-center py-12">
      <div className="relative h-40 w-40">
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

        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            borderImage:
              "linear-gradient(to right, #06b6d4, #8b5cf6, #ec4899, #8b5cf6, #06b6d4) 1",
            borderRadius: "50%",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Middle ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-transparent"
          style={{
            borderImage:
              "linear-gradient(to right, #8b5cf6, #ec4899, #06b6d4, #8b5cf6) 1",
            borderRadius: "50%",
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
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
                boxShadow: `0 0 10px ${colors[index % colors.length]}`,
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
            boxShadow: [
              "0 0 10px rgba(6, 182, 212, 0.7), 0 0 20px rgba(6, 182, 212, 0.4)",
              "0 0 15px rgba(168, 85, 247, 0.7), 0 0 30px rgba(168, 85, 247, 0.4)",
              "0 0 10px rgba(6, 182, 212, 0.7), 0 0 20px rgba(6, 182, 212, 0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full"
        />

        {/* Inner spinning element */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white/30"
          animate={{
            rotate: [0, 360],
            borderColor: [
              "rgba(6, 182, 212, 0.7)",
              "rgba(168, 85, 247, 0.7)",
              "rgba(236, 72, 153, 0.7)",
              "rgba(168, 85, 247, 0.7)",
              "rgba(6, 182, 212, 0.7)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-slate-300 font-medium font-orbitron tracking-wider"
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{
            opacity: [0.5, 1, 0.5],
            textShadow: [
              "0 0 5px rgba(139, 92, 246, 0.5)",
              "0 0 10px rgba(139, 92, 246, 0.7)",
              "0 0 5px rgba(139, 92, 246, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="mr-2">ANALYZING QUANTUM PATTERNS</span>
          <motion.span
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            .
          </motion.span>
          <motion.span
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.3,
            }}
          >
            .
          </motion.span>
          <motion.span
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.6,
            }}
          >
            .
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Spinner;
