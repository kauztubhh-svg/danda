"use client";

import React from "react";
import { motion } from "framer-motion";
import { EyeOff, CheckCircle2 } from "lucide-react";

interface NormalPlayerCardProps {
  playerName: string;
  secretWord: string;
  category: string;
  onHide: () => void;
}

export default function NormalPlayerCard({
  playerName,
  secretWord,
  category,
  onHide,
}: NormalPlayerCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-6 text-center"
    >
      {/* Top Banner */}
      <div className="w-full flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
          <CheckCircle2 size={14} />
          <span>CIVILIAN PLAYER</span>
        </div>
      </div>

      {/* Secret Word Display Card */}
      <div className="my-auto w-full space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {playerName}
          </p>
          <p className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
            YOUR SECRET WORD
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/10 space-y-4">
          <div className="text-3xl sm:text-4xl font-black text-white tracking-tight break-words">
            {secretWord}
          </div>

          <div className="inline-block px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            Category: <span className="text-indigo-300">{category}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-medium px-4">
          Remember this secret word. Give subtle clues to prove you know it without giving it away!
        </p>
      </div>

      {/* Hide Button */}
      <div className="w-full pt-4">
        <button
          type="button"
          onClick={onHide}
          className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg active:scale-[0.98] transition flex items-center justify-center space-x-2.5"
        >
          <EyeOff size={20} className="text-slate-400" />
          <span>HIDE CARD</span>
        </button>
      </div>
    </motion.div>
  );
}
