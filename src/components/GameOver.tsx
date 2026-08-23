"use client";

import React from "react";
import { useGameState } from "@/hooks/useGameState";
import { motion } from "framer-motion";
import { Skull, Trophy, RotateCcw, PlusCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import { getImposterHint } from "@/lib/game";

export default function GameOver() {
  const { state, resetGame } = useGameState();

  const secretWord = state.secretWord;
  const imposterPlayers = state.players.filter((p) => state.imposters.includes(p.id));

  return (
    <div className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-4 space-y-5 text-center">
      {/* Top Banner */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black tracking-widest uppercase">
          <Trophy size={14} />
          <span>GAME OVER</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          THE TRUTH REVEALED
        </h1>
      </div>

      {/* Main Results Container */}
      <div className="space-y-4 w-full flex-1 overflow-y-auto pr-0.5">
        {/* Secret Word Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/10 space-y-2"
        >
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            SECRET WORD
          </div>
          <div className="text-3xl font-black text-white tracking-tight break-words">
            {secretWord?.word}
          </div>
          <div className="inline-block px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            Category: <span className="text-indigo-300">{secretWord?.category}</span>
          </div>
        </motion.div>

        {/* Imposter(s) Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="p-5 rounded-3xl bg-slate-900 border-2 border-rose-500/50 shadow-xl shadow-rose-500/10 space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-black text-rose-400 uppercase tracking-widest">
            <Skull size={16} />
            <span>{imposterPlayers.length > 1 ? "THE IMPOSTERS" : "THE IMPOSTER"}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {imposterPlayers.map((p) => (
              <span
                key={p.id}
                className="px-4 py-2 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-200 text-lg font-black tracking-wide uppercase"
              >
                {p.name}
              </span>
            ))}
          </div>

          {/* Imposter Hint Given */}
          {secretWord && (
            <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <Lightbulb size={14} className="text-amber-400 shrink-0" />
              <span>Hint given: <strong className="text-slate-200">&ldquo;{getImposterHint(secretWord)}&rdquo;</strong></span>
            </div>
          )}
        </motion.div>

        {/* Full Player Roster Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5 text-left"
        >
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            Player Roster
          </div>

          <div className="space-y-1.5">
            {state.players.map((p) => {
              const isImp = state.imposters.includes(p.id);
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 text-xs"
                >
                  <span className="font-bold text-white">{p.name}</span>
                  {isImp ? (
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-bold uppercase text-[10px] flex items-center gap-1">
                      <Skull size={11} />
                      <span>Imposter</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>Civilian</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pt-2">
        <button
          type="button"
          onClick={() => resetGame(true)}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2.5 active:scale-[0.98]"
        >
          <RotateCcw size={20} />
          <span>START ANOTHER GAME</span>
        </button>

        <button
          type="button"
          onClick={() => resetGame(false)}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold rounded-2xl text-sm transition flex items-center justify-center space-x-2 active:scale-[0.98]"
        >
          <PlusCircle size={16} />
          <span>NEW SETUP (RESET PLAYERS)</span>
        </button>
      </div>
    </div>
  );
}
