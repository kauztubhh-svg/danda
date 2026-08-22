"use client";

import React from "react";
import { motion } from "framer-motion";
import { EyeOff, Skull, AlertTriangle, Lightbulb } from "lucide-react";

interface ImposterCardProps {
  playerName: string;
  hint: string;
  category: string;
  onHide: () => void;
}

export default function ImposterCard({
  playerName,
  hint,
  category,
  onHide,
}: ImposterCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-6 text-center"
    >
      {/* Top Warning Banner */}
      <div className="w-full flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black tracking-widest uppercase animate-pulse">
          <Skull size={14} />
          <span>YOU ARE THE IMPOSTER</span>
        </div>
      </div>

      {/* Imposter Identity & Hint Card */}
      <div className="my-auto w-full space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {playerName}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider text-rose-400 uppercase">
            <AlertTriangle size={14} />
            <span>YOU DO NOT KNOW THE SECRET WORD</span>
          </div>
        </div>

        <div className="p-7 rounded-3xl bg-slate-900 border-2 border-rose-500/50 shadow-2xl shadow-rose-500/10 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Lightbulb size={16} />
            <span>YOUR ONLY HINT</span>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-rose-100 tracking-tight break-words py-1">
            &ldquo;{hint}&rdquo;
          </div>

          <div className="inline-block px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            Category: <span className="text-rose-300">{category}</span>
          </div>
        </div>

        <p className="text-xs text-rose-300/80 font-medium px-4 leading-relaxed">
          Blend in! Listen carefully to other players&apos; clues, sound confident, and don&apos;t get caught!
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
