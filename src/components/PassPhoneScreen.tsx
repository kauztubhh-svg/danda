"use client";

import React from "react";
import { useGameState } from "@/hooks/useGameState";
import { motion } from "framer-motion";
import { Smartphone, Eye, Shield } from "lucide-react";

export default function PassPhoneScreen() {
  const { state, currentPlayerToReveal, startRevealCard, resetGame } = useGameState();

  if (!currentPlayerToReveal) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto gap-5 text-center">
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">Unable to load the next player</h2>
          <p className="text-sm text-slate-400">
            The game data is out of sync. Restart the setup to continue playing.
          </p>
        </div>
        <button
          type="button"
          onClick={() => resetGame(false)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-5 rounded-2xl transition"
        >
          RESTART GAME
        </button>
      </div>
    );
  }

  const currentNumber = state.currentRevealIndex + 1;
  const totalNumber = state.revealOrder.length;

  return (
    <div className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-8 text-center">
      {/* Top indicator */}
      <div className="w-full flex items-center justify-between px-2">
        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
          CARD REVEAL
        </span>
        <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-indigo-400">
          Player {currentNumber} of {totalNumber}
        </div>
      </div>

      {/* Center Phone Pass Prompt */}
      <div className="space-y-6 my-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative inline-block"
        >
          <div className="w-24 h-24 mx-auto rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/5">
            <Smartphone size={44} className="animate-pulse" />
          </div>
        </motion.div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Pass the phone to
          </p>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase break-words px-2">
            {currentPlayerToReveal.name}
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs font-medium max-w-xs mx-auto">
          <Shield size={14} className="text-indigo-400 shrink-0" />
          <span>Keep your screen private. Do not show anyone else!</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startRevealCard}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2.5"
        >
          <Eye size={20} />
          <span>VIEW MY CARD</span>
        </motion.button>
      </div>
    </div>
  );
}
