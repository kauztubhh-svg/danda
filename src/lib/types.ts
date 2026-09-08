export type GamePhase = 
  | "home"
  | "setup" 
  | "pass-phone" 
  | "reveal" 
  | "ready-to-start" 
  | "starter-selection" 
  | "clue-phase" 
  | "game-over";

export type Player = {
  id: string;
  name: string;
  role?: "player" | "imposter";
};

export type WordEntry = {
  id: string;
  word: string;
  category: string;
  hint: string;
  imposterHint?: string; // single-word contextual hint shown to imposters
  difficulty?: "easy" | "medium" | "hard";
};

export type GameState = {
  phase: GamePhase;
  players: Player[];
  imposterCount: number;
  category: string;
  secretWord?: WordEntry;
  imposters: string[]; // array of player IDs who are imposters
  revealOrder: string[]; // randomized array of player IDs for card reveal
  currentRevealIndex: number;
  startingPlayerId?: string;
  currentTurnIndex?: number;
  clueRound?: number;
};

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 20;
