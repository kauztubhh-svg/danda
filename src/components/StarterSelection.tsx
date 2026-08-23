"use client";

import React, { useState, useEffect } from "react";
import { useGameState } from "@/hooks/useGameState";
import { motion } from "framer-motion";
import { Dices, Sparkles, ArrowRight } from "lucide-react";

export default function StarterSelection() {
  const { state, advanceStarterToCluePhase } = useGameState();
  const [displayedName, setDisplayedName] = useState<string>("");
  const [isRolling, setIsRolling] = useState<boolean>(true);

  const chosenPlayer = state.players.find((p) => p.id === state.startingPlayerId) || state.players[0];

  useEffect(() => {
    let rollCount = 0;
    const maxRolls = 18;
    const interval = setInterval(() => {
      rollCount++;
      const randomPlayer = state.players[Math.floor(Math.random() * state.players.length)];
      setDisplayedName(randomPlayer.name);

      if (rollCount >= maxRolls) {
        clearInterval(interval);
        setDisplayedName(chosenPlayer.name);
        setIsRolling(false);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [chosenPlayer.name, state.players]);

  return (
    <div className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-8 text-center">
      {/* Top Banner */}
      <div className="w-full flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide">
          <Dices size={14} />
          <span>RANDOM SELECTION</span>
        </div>
      </div>

      {/* Center Reveal */}
      <div className="space-y-6 my-auto w-full">
        <motion.div
          animate={isRolling ? { rotate: [0, 15, -15, 0] } : { scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
          className="w-24 h-24 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-2xl shadow-indigo-500/10"
        >
          <Dices size={48} />
        </motion.div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            STARTING PLAYER
          </p>
          <motion.div
            key={displayedName}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-slate-900 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/20"
          >
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase break-words">
              {displayedName || chosenPlayer.name}
            </h1>
          </motion.div>
        </div>

        {!isRolling && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-slate-300 font-medium flex items-center justify-center gap-1.5"
          >
            <Sparkles size={16} className="text-amber-400 shrink-0" />
            <span><strong>{chosenPlayer.name}</strong> gives the first clue!</span>
          </motion.p>
        )}
      </div>

      {/* Continue Button */}
      <div className="w-full pt-4">
        <button
          type="button"
          disabled={isRolling}
          onClick={advanceStarterToCluePhase}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2.5 active:scale-[0.98]"
        >
          <span>CONTINUE TO CLUES</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
