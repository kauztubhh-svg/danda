"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface EndGameDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function EndGameDialog({
  isOpen,
  onCancel,
  onConfirm,
}: EndGameDialogProps) {
  if (!isOpen) return null;

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
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-6"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-white">END GAME?</h3>
          <p className="text-xs text-slate-400 leading-relaxed px-2">
            Are you ready to reveal the secret word and who the imposter(s) are?
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold rounded-2xl text-base shadow-lg shadow-rose-600/30 transition"
          >
            YES, REVEAL RESULTS
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-300 font-semibold rounded-2xl text-sm transition"
          >
            CANCEL (CONTINUE PLAYING)
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
