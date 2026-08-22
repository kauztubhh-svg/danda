"use client";

import React from "react";
import { Minus, Plus, Skull } from "lucide-react";
import { getMaxImposters } from "@/lib/game";

interface ImposterSelectorProps {
  playerCount: number;
  imposterCount: number;
  onChange: (count: number) => void;
}

export default function ImposterSelector({
  playerCount,
  imposterCount,
  onChange,
}: ImposterSelectorProps) {
  const maxAllowed = getMaxImposters(playerCount);

  const handleDecrement = () => {
    if (imposterCount > 1) {
      onChange(imposterCount - 1);
    }
  };

  const handleIncrement = () => {
    if (imposterCount < maxAllowed) {
      onChange(imposterCount + 1);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center px-1">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Number of Imposters
        </label>
        <span className="text-[11px] text-slate-500">
          Max for {playerCount} players: {maxAllowed}
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-3 pl-1">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Skull size={20} />
          </div>
          <div>
            <div className="text-base font-bold text-white">
              {imposterCount} {imposterCount === 1 ? "Imposter" : "Imposters"}
            </div>
            <div className="text-xs text-slate-400">
              {playerCount - imposterCount} normal {playerCount - imposterCount === 1 ? "player" : "players"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={imposterCount <= 1}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center justify-center transition"
            aria-label="Decrease imposters"
          >
            <Minus size={18} />
          </button>

          <span className="w-8 text-center text-lg font-black text-white">
            {imposterCount}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={imposterCount >= maxAllowed}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center justify-center transition"
            aria-label="Increase imposters"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
