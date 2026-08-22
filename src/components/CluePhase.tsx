"use client";

import React, { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Flag, Users, CheckCircle } from "lucide-react";
import EndGameDialog from "@/components/EndGameDialog";

export default function CluePhase() {
  const { state, currentTurnPlayer, nextClueTurn, endGame } = useGameState();
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  const activePlayer = currentTurnPlayer || state.players[0];
  const round = state.clueRound || 1;

  return (
    <div className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-6 text-center">
      {/* Top Header & Turn Tracker */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400">
          Clue Round {round}
        </div>

        <button
          type="button"
          onClick={() => setShowEndConfirm(true)}
          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
        >
          <Flag size={13} />
          <span>END GAME</span>
        </button>
      </div>

      {/* Main Clue Giver Card */}
      <div className="my-auto w-full space-y-6">
        <motion.div
          key={activePlayer.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl">
            <MessageSquare size={38} />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              CURRENT TURN
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase break-words px-2">
              {activePlayer.name}
            </h1>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-xs mx-auto">
            <p className="text-xs text-slate-300 font-medium">
              Give your clue verbally to the group. Keep it subtle!
            </p>
          </div>
        </motion.div>

        {/* Turn Sequence Indicators */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Users size={12} />
            <span>Turn Order</span>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 px-2">
            {state.players.map((p, idx) => {
              const isCurrent = idx === state.currentTurnIndex;
              return (
                <span
                  key={p.id}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                      : "bg-slate-900 border border-slate-800 text-slate-300"
                  }`}
                >
                  {p.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 pt-4">
        <button
          type="button"
          onClick={nextClueTurn}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2.5 active:scale-[0.98]"
        >
          <CheckCircle size={20} />
          <span>DONE (PASS TURN)</span>
        </button>

        <p className="text-[11px] text-slate-400">
          No timers. Take as much time as your group needs to discuss and vote!
        </p>
      </div>

      {/* End Game Confirmation Modal */}
      <AnimatePresence>
        {showEndConfirm && (
          <EndGameDialog
            isOpen={showEndConfirm}
            onCancel={() => setShowEndConfirm(false)}
            onConfirm={() => {
              setShowEndConfirm(false);
              endGame();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
