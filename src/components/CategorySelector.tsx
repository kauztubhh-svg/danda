"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, getWordsByCategory } from "@/data/words";
import { Check, ChevronRight, Layers, X } from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCount = getWordsByCategory(selectedCategory).length;

  return (
    <div className="w-full space-y-2">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
        Word Category
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition group active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Layers size={20} />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{selectedCategory}</span>
              {selectedCategory === "ALL" && (
                <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[10px] font-bold">
                  DEFAULT
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{selectedCount} words available</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-slate-500 group-hover:text-slate-300 transition" />
      </button>

      {/* Category Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Select Category</h3>
                  <p className="text-xs text-slate-400">Pick a theme for your words</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Category Grid / List */}
              <div className="p-4 overflow-y-auto space-y-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = getWordsByCategory(cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition text-left ${
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-slate-800/40 border-slate-800/80 hover:bg-slate-800 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {cat === "ALL" ? "★" : cat[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm flex items-center gap-2">
                            <span>{cat}</span>
                            {cat === "ALL" && (
                              <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-1.5 py-0.2 rounded font-bold">
                                ALL WORDS
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400">{count} words</span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          <Check size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
