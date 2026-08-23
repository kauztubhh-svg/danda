"use client";

import React, { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Info, Sparkles, ShieldAlert } from "lucide-react";
import HowToPlay from "@/components/HowToPlay";

export default function HomeScreen() {
  const { updateState } = useGameState();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between items-center w-full max-w-sm mx-auto py-8">
      {/* Hero Branding */}
      <div className="text-center space-y-4 my-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative inline-block"
        >
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-2xl shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <ShieldAlert size={44} className="text-indigo-400" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black tracking-tight text-white"
          >
            IMPOSTER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-400 font-medium tracking-wide flex items-center justify-center gap-1.5"
          >
            <span>Who can you trust?</span>
            <Sparkles size={14} className="text-amber-400" />
          </motion.p>
        </div>

        <div className="inline-block px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          1 Phone • 3–20 Players • Pass & Play
        </div>
      </div>

      {/* Main Buttons */}
      <div className="flex flex-col w-full space-y-3.5 pt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => updateState({ phase: "setup" })}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-3"
        >
          <Users size={22} />
          <span>START NEW GAME</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowHowToPlay(true)}
          className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-800 border border-slate-800 text-slate-200 font-semibold py-3.5 px-6 rounded-2xl text-base transition flex items-center justify-center space-x-2.5"
        >
          <Info size={18} className="text-slate-400" />
          <span>HOW TO PLAY</span>
        </motion.button>
      </div>

      {/* Rules Modal */}
      <AnimatePresence>
        {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
      </AnimatePresence>
    </div>
  );
}
