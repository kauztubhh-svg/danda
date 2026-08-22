"use client";

import React, { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { MIN_PLAYERS, MAX_PLAYERS } from "@/lib/types";
import { validateGameSetup } from "@/lib/game";
import PlayerInputs from "@/components/PlayerInputs";
import CategorySelector from "@/components/CategorySelector";
import ImposterSelector from "@/components/ImposterSelector";
import { ArrowLeft, Minus, Plus, Play, AlertCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function GameSetup() {
  const {
    state,
    updateState,
    setPlayerCount,
    setPlayerName,
    setCategory,
    setImposterCount,
    startGame,
  } = useGameState();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validation = validateGameSetup(state.players, state.imposterCount, state.category);

  const handleStartGame = () => {
    const err = startGame();
    if (err) {
      setErrorMessage(err);
    } else {
      setErrorMessage(null);
    }
  };

  const handlePlayerCountChange = (newCount: number) => {
    setPlayerCount(newCount);
    setErrorMessage(null);
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full max-w-sm mx-auto py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => updateState({ phase: "home" })}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition active:scale-95 flex items-center gap-1 text-xs font-semibold"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <h2 className="text-base font-bold text-white tracking-wide">Game Setup</h2>

        <div className="w-16" /> {/* Placeholder for balance */}
      </div>

      {/* Main Setup Controls */}
      <div className="space-y-5 flex-1 overflow-y-auto pr-0.5">
        {/* Number of Players Stepper */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Players
            </label>
            <span className="text-[11px] text-slate-500">
              Min: {MIN_PLAYERS} • Max: {MAX_PLAYERS}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 pl-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Users size={20} />
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  {state.players.length} Players
                </div>
                <div className="text-xs text-slate-400">Pass-and-play group</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePlayerCountChange(state.players.length - 1)}
                disabled={state.players.length <= MIN_PLAYERS}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center justify-center transition"
                aria-label="Decrease player count"
              >
                <Minus size={18} />
              </button>

              <span className="w-8 text-center text-lg font-black text-white">
                {state.players.length}
              </span>

              <button
                type="button"
                onClick={() => handlePlayerCountChange(state.players.length + 1)}
                disabled={state.players.length >= MAX_PLAYERS}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center justify-center transition"
                aria-label="Increase player count"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Player Name Inputs */}
        <PlayerInputs
          players={state.players}
          onNameChange={(id, name) => {
            setPlayerName(id, name);
            setErrorMessage(null);
          }}
          duplicateNames={validation.duplicateNames}
        />

        {/* Imposter Count Stepper */}
        <ImposterSelector
          playerCount={state.players.length}
          imposterCount={state.imposterCount}
          onChange={(count) => {
            setImposterCount(count);
            setErrorMessage(null);
          }}
        />

        {/* Category Selector */}
        <CategorySelector
          selectedCategory={state.category}
          onSelectCategory={(cat) => {
            setCategory(cat);
            setErrorMessage(null);
          }}
        />

        {/* Validation / Error Message Banner */}
        {(errorMessage || (!validation.isValid && validation.error)) && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2.5"
          >
            <AlertCircle size={18} className="shrink-0 text-rose-400" />
            <span>{errorMessage || validation.error}</span>
          </motion.div>
        )}
      </div>

      {/* Start Button */}
      <div className="pt-3">
        <button
          type="button"
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <Play size={20} className="fill-white" />
          <span>START GAME</span>
        </button>
      </div>
    </div>
  );
}
