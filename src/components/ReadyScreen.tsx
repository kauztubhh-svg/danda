"use client";

import React from "react";
import { useGameState } from "@/hooks/useGameState";
import { motion } from "framer-motion";
import { CheckCircle2, Play, Users, MessageSquare } from "lucide-react";

export default function ReadyScreen() {
  const { state, beginStarterSelection } = useGameState();

  return (
    <div className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-8 text-center">
      {/* Top Banner */}
      <div className="w-full flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
          <CheckCircle2 size={14} />
          <span>REVEAL COMPLETE</span>
        </div>
      </div>

      {/* Center Info */}
      <div className="space-y-6 my-auto w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl"
        >
          <Users size={36} />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white tracking-tight">
            EVERYONE IS READY
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            All players have seen their cards.
          </p>
        </div>

        {/* Players Chips */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <MessageSquare size={14} className="text-indigo-400" />
            <span>Players in Game ({state.players.length})</span>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {state.players.map((p) => (
              <span
                key={p.id}
                className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200"
              >
                {p.name}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 pt-1">
            Press Start Game to choose the first clue giver!
          </p>
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={beginStarterSelection}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2.5"
        >
          <Play size={20} className="fill-white" />
          <span>START GAME</span>
        </motion.button>
      </div>
    </div>
  );
}
