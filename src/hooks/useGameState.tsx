"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { GameState, Player, MIN_PLAYERS, MAX_PLAYERS } from "@/lib/types";
import { selectRandomWord, shuffleArray, validateGameSetup, getMaxImposters } from "@/lib/game";
import { soundManager } from "@/lib/audio";

interface GameContextType {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  setPlayerCount: (count: number) => void;
  setPlayerName: (id: string, name: string) => void;
  setCategory: (category: string) => void;
  setImposterCount: (count: number) => void;
  startGame: () => string | null;
  startRevealCard: () => void;
  hideAndNextCard: () => void;
  beginStarterSelection: () => void;
  advanceStarterToCluePhase: () => void;
  nextClueTurn: () => void;
  endGame: () => void;
  resetGame: (preserveSettings?: boolean) => void;
  toggleSound: () => void;
  isSoundEnabled: boolean;
  currentPlayerToReveal: Player | undefined;
  isCurrentPlayerImposter: boolean;
  currentTurnPlayer: Player | undefined;
}

const defaultInitialPlayers: Player[] = [
  { id: "p-1", name: "" },
  { id: "p-2", name: "" },
  { id: "p-3", name: "" },
  { id: "p-4", name: "" },
];

const defaultState: GameState = {
  phase: "home",
  players: defaultInitialPlayers,
  imposterCount: 1,
  category: "ALL",
  imposters: [],
  revealOrder: [],
  currentRevealIndex: 0,
  clueRound: 1,
  soundEnabled: true,
};

const STORAGE_KEY = "imposter_party_game_settings_v1";

function normalizePlayers(value: unknown): Player[] {
  if (!Array.isArray(value)) return [];

  const usedIds = new Set<string>();
  let nextGeneratedId = 1;

  return value.map((entry, index) => {
    const player = entry && typeof entry === "object" ? entry as Partial<Player> : {};
    let id = typeof player.id === "string" && player.id.trim() ? player.id : "";

    if (!id || usedIds.has(id)) {
      do {
        id = `p-${nextGeneratedId++}`;
      } while (usedIds.has(id));
    }

    usedIds.add(id);
    return {
      id,
      name: typeof player.name === "string" ? player.name : `Player ${index + 1}`,
    };
  });
}

function getInitialState(): GameState {
  if (typeof window === "undefined") return defaultState;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const players = normalizePlayers(parsed.players);
      if (players.length >= MIN_PLAYERS) {
        return {
          ...defaultState,
          players,
          imposterCount: parsed.imposterCount || 1,
          category: parsed.category || "ALL",
          soundEnabled: parsed.soundEnabled ?? true,
        };
      }
    }
  } catch {
    // Ignore storage parsing errors
  }
  return defaultState;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(getInitialState);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.soundEnabled !== undefined) {
          soundManager.setMuted(!parsed.soundEnabled);
          return Boolean(parsed.soundEnabled);
        }
      }
    } catch {
      // Ignore
    }
    return true;
  });

  // Save preferences when setup settings change
  useEffect(() => {
    if (state.phase === "setup" || state.phase === "home") {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            players: state.players,
            imposterCount: state.imposterCount,
            category: state.category,
            soundEnabled: isSoundEnabled,
          })
        );
      } catch {
        // Ignore
      }
    }
  }, [state.players, state.imposterCount, state.category, state.phase, isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      soundManager.setMuted(!next);
      return next;
    });
  }, []);

  const updateState = useCallback((updates: Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setPlayerCount = useCallback((count: number) => {
    const clampedCount = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, count));
    setState((prev) => {
      let newPlayers = [...prev.players];
      if (clampedCount > newPlayers.length) {
        for (let i = newPlayers.length; i < clampedCount; i++) {
          const usedIds = new Set(newPlayers.map((player) => player.id));
          let id = `p-${Date.now()}-${i + 1}`;
          let suffix = 1;
          while (usedIds.has(id)) {
            id = `p-${Date.now()}-${i + 1}-${suffix++}`;
          }
          newPlayers.push({ id, name: "" });
        }
      } else if (clampedCount < newPlayers.length) {
        newPlayers = newPlayers.slice(0, clampedCount);
      }

      const maxImposters = getMaxImposters(newPlayers.length);
      const safeImposterCount = Math.min(prev.imposterCount, maxImposters);

      return {
        ...prev,
        players: newPlayers,
        imposterCount: safeImposterCount,
      };
    });
  }, []);

  const setPlayerName = useCallback((id: string, name: string) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, name } : p)),
    }));
  }, []);

  const setCategory = useCallback((category: string) => {
    setState((prev) => ({ ...prev, category }));
  }, []);

  const setImposterCount = useCallback((count: number) => {
    setState((prev) => {
      const maxAllowed = getMaxImposters(prev.players.length);
      const clamped = Math.max(1, Math.min(maxAllowed, count));
      return { ...prev, imposterCount: clamped };
    });
  }, []);

  const startGame = useCallback((): string | null => {
    const validation = validateGameSetup(state.players, state.imposterCount, state.category);
    if (!validation.isValid) {
      return validation.error;
    }

    // Clean player names (trim whitespace)
    const cleanedPlayers = state.players.map((p) => ({
      ...p,
      name: p.name.trim(),
    }));

    // Select random secret word
    const secretWord = selectRandomWord(state.category);
    if (!secretWord) {
      return "No words found for this category. Please pick another category.";
    }

    // Assign imposters randomly using Fisher-Yates shuffle
    const shuffledPlayers = shuffleArray(cleanedPlayers);
    const selectedImposters = shuffledPlayers.slice(0, state.imposterCount).map((p) => p.id);

    // Generate randomized reveal order so player order is unpredictable
    const revealOrder = shuffleArray(cleanedPlayers).map((p) => p.id);

    setState((prev) => ({
      ...prev,
      players: cleanedPlayers,
      secretWord,
      imposters: selectedImposters,
      revealOrder,
      currentRevealIndex: 0,
      phase: "pass-phone",
      clueRound: 1,
    }));

    return null;
  }, [state.players, state.imposterCount, state.category]);

  const startRevealCard = useCallback(() => {
    setState((prev) => {
      const hasCurrentPlayer = prev.revealOrder[prev.currentRevealIndex] !== undefined;
      if (prev.phase !== "pass-phone" || !hasCurrentPlayer) return prev;
      return { ...prev, phase: "reveal" };
    });
  }, []);

  const hideAndNextCard = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "reveal") return prev;

      const nextIndex = prev.currentRevealIndex + 1;
      if (nextIndex >= prev.revealOrder.length) {
        return {
          ...prev,
          currentRevealIndex: prev.revealOrder.length,
          phase: "ready-to-start",
        };
      }
      return {
        ...prev,
        currentRevealIndex: nextIndex,
        phase: "pass-phone",
      };
    });
  }, []);

  const beginStarterSelection = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "ready-to-start" || prev.players.length === 0) return prev;

      const shuffled = shuffleArray(prev.players);
      const startingPlayerId = shuffled[0].id;
      return {
        ...prev,
        phase: "starter-selection",
        startingPlayerId,
      };
    });
  }, []);

  const advanceStarterToCluePhase = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "starter-selection" || prev.players.length === 0) return prev;

      const starterIdx = prev.players.findIndex((p) => p.id === prev.startingPlayerId);
      const initialTurnIndex = starterIdx !== -1 ? starterIdx : 0;
      return {
        ...prev,
        phase: "clue-phase",
        currentTurnIndex: initialTurnIndex,
        clueRound: 1,
      };
    });
  }, []);

  const nextClueTurn = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "clue-phase" || prev.players.length === 0) return prev;

      const currentIndex = prev.currentTurnIndex ?? 0;
      const nextIndex = (currentIndex + 1) % prev.players.length;
      const isNewRound = nextIndex === 0;
      return {
        ...prev,
        currentTurnIndex: nextIndex,
        clueRound: isNewRound ? (prev.clueRound || 1) + 1 : prev.clueRound,
      };
    });
  }, []);

  const endGame = useCallback(() => {
    soundManager.playGameOver();
    setState((prev) => ({ ...prev, phase: "game-over" }));
  }, []);

  const resetGame = useCallback((preserveSettings = true) => {
    setState((prev) => ({
      ...defaultState,
      phase: preserveSettings ? "setup" : "home",
      players: preserveSettings
        ? prev.players.map((p) => ({ ...p, role: undefined }))
        : defaultInitialPlayers,
      imposterCount: preserveSettings ? prev.imposterCount : 1,
      category: preserveSettings ? prev.category : "ALL",
      soundEnabled: prev.soundEnabled,
    }));
  }, []);

  // Computed properties
  const currentPlayerToReveal = useMemo(() => {
    if (state.phase !== "pass-phone" && state.phase !== "reveal") return undefined;
    if (state.currentRevealIndex < 0 || state.currentRevealIndex >= state.revealOrder.length) {
      return undefined;
    }
    const currentId = state.revealOrder[state.currentRevealIndex];
    return state.players.find((p) => p.id === currentId);
  }, [state.phase, state.revealOrder, state.currentRevealIndex, state.players]);

  const isCurrentPlayerImposter = useMemo(() => {
    if (!currentPlayerToReveal) return false;
    return state.imposters.includes(currentPlayerToReveal.id);
  }, [currentPlayerToReveal, state.imposters]);

  const currentTurnPlayer = useMemo(() => {
    if (state.phase !== "clue-phase" || state.currentTurnIndex === undefined) return undefined;
    return state.players[state.currentTurnIndex];
  }, [state.phase, state.currentTurnIndex, state.players]);

  return (
    <GameContext.Provider
      value={{
        state,
        updateState,
        setPlayerCount,
        setPlayerName,
        setCategory,
        setImposterCount,
        startGame,
        startRevealCard,
        hideAndNextCard,
        beginStarterSelection,
        advanceStarterToCluePhase,
        nextClueTurn,
        endGame,
        resetGame,
        toggleSound,
        isSoundEnabled,
        currentPlayerToReveal,
        isCurrentPlayerImposter,
        currentTurnPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return context;
}
