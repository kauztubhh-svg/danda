"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Users, Eye, HelpCircle, MessageSquare, Award } from "lucide-react";

interface HowToPlayProps {
  onClose: () => void;
}

export default function HowToPlay({ onClose }: HowToPlayProps) {
  const steps = [
    {
      num: 1,
      icon: Users,
      title: "Setup Players & Role",
      desc: "Enter 3 to 20 players, choose the number of imposters, and pick a word category.",
    },
    {
      num: 2,
      icon: Eye,
      title: "Pass & Hold to Reveal",
      desc: "Pass the phone to each player in private. Press and hold your card to reveal your secret identity.",
    },
    {
      num: 3,
      icon: HelpCircle,
      title: "Word vs. Hint",
      desc: "Normal players see the Secret Word. Imposters see ONLY one vague related word and have no idea what the real word is!",
    },
    {
      num: 4,
      icon: MessageSquare,
      title: "Give Clues & Discuss",
      desc: "A random starting player is chosen. Everyone gives one short clue in turn. Imposters must bluff to blend in without knowing the word!",
    },
    {
      num: 5,
      icon: Award,
      title: "Vote & Reveal",
      desc: "Discuss the clues. Vote on who you suspect is the imposter. When ready, press End Game to reveal the truth!",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">How to Play</h2>
              <p className="text-xs text-slate-400">Pass-and-play party rules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-800/50 border border-slate-800"
              >
                <div className="w-9 h-9 shrink-0 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Icon size={16} className="text-indigo-400" />
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/50">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl transition"
          >
            GOT IT
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
