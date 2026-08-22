"use client";

import React, { useRef } from "react";
import { Player } from "@/lib/types";
import { AlertCircle } from "lucide-react";

interface PlayerInputsProps {
  players: Player[];
  onNameChange: (id: string, name: string) => void;
  duplicateNames?: string[];
}

export default function PlayerInputs({
  players,
  onNameChange,
  duplicateNames = [],
}: PlayerInputsProps) {
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextPlayer = players[index + 1];
      if (nextPlayer && inputRefs.current[nextPlayer.id]) {
        inputRefs.current[nextPlayer.id]?.focus();
      }
    }
  };

  const isDuplicate = (name: string) => {
    if (!name.trim()) return false;
    return duplicateNames.some(d => d.toLowerCase() === name.trim().toLowerCase());
  };

  return (
    <div className="space-y-2.5 w-full">
      <div className="flex justify-between items-center px-1">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Player Names ({players.length})
        </label>
        <span className="text-[11px] text-slate-500">Tap Enter for next</span>
      </div>

      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 py-0.5 custom-scrollbar">
        {players.map((player, index) => {
          const duplicate = isDuplicate(player.name);

          return (
            <div key={player.id} className="relative flex items-center">
              <div className="absolute left-3 flex items-center gap-2 pointer-events-none text-slate-500">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-bold text-slate-400 flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              <input
                ref={(el) => {
                  inputRefs.current[player.id] = el;
                }}
                type="text"
                value={player.name}
                onChange={(e) => onNameChange(player.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder={`Player ${index + 1}`}
                maxLength={20}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                className={`w-full pl-11 pr-9 py-3 bg-slate-900 border rounded-2xl text-sm font-semibold text-white placeholder-slate-600 focus:outline-none transition ${
                  duplicate
                    ? "border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 bg-rose-950/20"
                    : "border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                }`}
              />

              {duplicate && (
                <div className="absolute right-3 text-rose-400 pointer-events-none flex items-center" title="Duplicate name">
                  <AlertCircle size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
