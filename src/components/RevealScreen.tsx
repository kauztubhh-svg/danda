"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGameState } from "@/hooks/useGameState";
import { Lock, Fingerprint } from "lucide-react";
import NormalPlayerCard from "@/components/NormalPlayerCard";
import ImposterCard from "@/components/ImposterCard";
import { soundManager } from "@/lib/audio";

const HOLD_DURATION_MS = 1100; // Hold time required for reveal

export default function RevealScreen() {
  const {
    state,
    currentPlayerToReveal,
    isCurrentPlayerImposter,
    hideAndNextCard,
  } = useGameState();

  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const holdStartRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTickProgressRef = useRef<number>(0);

  const handleRevealComplete = useCallback(() => {
    setIsRevealed(true);
    setIsHolding(false);
    setProgress(100);
    if (isCurrentPlayerImposter) {
      soundManager.playImposterReveal();
    } else {
      soundManager.playNormalReveal();
    }
  }, [isCurrentPlayerImposter]);

  const startHold = (e: React.PointerEvent) => {
    // Prevent default context menus or gesture triggers
    e.preventDefault();
    if (isRevealed) return;

    setIsHolding(true);
    holdStartRef.current = Date.now();
    lastTickProgressRef.current = 0;

    const step = () => {
      if (!holdStartRef.current) return;
      const elapsed = Date.now() - holdStartRef.current;
      const currentProgress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setProgress(currentProgress);

      // Audio feedback ticks every 20%
      if (currentProgress - lastTickProgressRef.current > 20) {
        soundManager.playTick(currentProgress / 100);
        lastTickProgressRef.current = currentProgress;
      }

      if (currentProgress >= 100) {
        handleRevealComplete();
      } else {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const cancelHold = () => {
    if (isRevealed) return;
    setIsHolding(false);
    holdStartRef.current = null;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  if (!currentPlayerToReveal || !state.secretWord) return null;

  // Render revealed role card
  if (isRevealed) {
    if (isCurrentPlayerImposter) {
      return (
        <ImposterCard
          playerName={currentPlayerToReveal.name}
          hint={state.secretWord.hint}
          category={state.secretWord.category}
          onHide={hideAndNextCard}
        />
      );
    }

    return (
      <NormalPlayerCard
        playerName={currentPlayerToReveal.name}
        secretWord={state.secretWord.word}
        category={state.secretWord.category}
        onHide={hideAndNextCard}
      />
    );
  }

  // Render Press-and-Hold Card
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-8 text-center select-none touch-none">
      {/* Top Header */}
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">
          PRIVATE ROLE REVEAL
        </p>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">
          {currentPlayerToReveal.name}
        </h2>
      </div>

      {/* Interactive Press & Hold Button / Card */}
      <div className="my-auto flex flex-col items-center justify-center w-full">
        <div
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
          onContextMenu={(e) => e.preventDefault()}
          className={`relative w-64 h-64 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-150 select-none touch-none ${
            isHolding ? "scale-95 bg-slate-900" : "scale-100 bg-slate-900/80 hover:bg-slate-900"
          } border-2 border-slate-800 shadow-2xl`}
          style={{ WebkitTouchCallout: "none" }}
        >
          {/* Animated SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="128"
              cy="128"
              r="54"
              className="stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="128"
              cy="128"
              r="54"
              className="stroke-indigo-500 transition-all duration-75 ease-linear"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Icon & Label */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-2 pointer-events-none">
            <div className={`p-3 rounded-2xl transition-colors ${
              isHolding ? "bg-indigo-600/30 text-indigo-300" : "bg-slate-800 text-indigo-400"
            }`}>
              {isHolding ? <Fingerprint size={38} className="animate-pulse" /> : <Lock size={38} />}
            </div>

            <div className="space-y-0.5">
              <span className="text-sm font-black text-white tracking-wider block">
                {isHolding ? "HOLDING..." : "PRESS & HOLD"}
              </span>
              <span className="text-[11px] font-bold text-slate-400 block tracking-wide">
                {isHolding ? `${Math.round(progress)}%` : "TO REVEAL CARD"}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <p className="mt-8 text-xs text-slate-400 font-medium max-w-xs">
          Hold down continuously until the circle fills. Releasing early keeps your card secret.
        </p>
      </div>

      <div className="w-full h-12" /> {/* Bottom Spacer */}
    </div>
  );
}
