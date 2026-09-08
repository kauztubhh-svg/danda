import { Player, WordEntry, MIN_PLAYERS, MAX_PLAYERS } from "./types";
import { getWordsByCategory } from "../data/words";

/**
 * Unbiased Fisher-Yates Shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Select a random word for a category
 */
export function selectRandomWord(category: string, excludeWordId?: string): WordEntry | undefined {
  let availableWords = getWordsByCategory(category);
  if (availableWords.length === 0) return undefined;
  
  if (excludeWordId && availableWords.length > 1) {
    const filtered = availableWords.filter(w => w.id !== excludeWordId);
    if (filtered.length > 0) {
      availableWords = filtered;
    }
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}

/**
 * Return a single-word imposter hint. Prefer per-word imposterHint when valid,
 * otherwise fall back to a safe category-level one-word hint.
 */
export function getImposterHint(word: WordEntry): string {
  // Helper: check single token (letters only) and that it doesn't leak the word
  const isSingleToken = (s?: string) => !!s && /^[a-z]+$/i.test(s);

  if (word.imposterHint && isSingleToken(word.imposterHint) && validateHint(word.word, word.imposterHint)) {
    return word.imposterHint.toLowerCase();
  }

  const categoryHints: Record<string, string> = {
    Animals: "creature",
    Food: "taste",
    Countries: "nation",
    Cities: "urban",
    Sports: "game",
    Movies: "film",
    "TV Shows": "series",
    Places: "site",
    Objects: "item",
    Professions: "job",
    Technology: "tech",
    Games: "play",
    Nature: "wild",
    General: "common",
    Bollywood: "film",
    "Indian Celebrities": "star",
    "Indian College Words": "campus",
    "Indian Food": "spice",
    "Indian Cities": "city",
    "Indian Culture": "tradition",
    "Indian Sports": "sport",
    Cybersecurity: "security",
    "Cyber Words": "network",
  };

  return (categoryHints[word.category] || "common").toLowerCase();
}

/**
 * Validate that hint does not contain the secret word or obvious direct forms
 */
export function validateHint(word: string, hint: string): boolean {
  if (!word || !hint) return false;
  const cleanWord = word.toLowerCase().trim();
  const cleanHint = hint.toLowerCase().trim();

  // Exact word containment check
  if (cleanHint.includes(cleanWord)) {
    return false;
  }

  // Token word check for multi-word phrases (e.g., "Virat Kohli" check "Virat", "Kohli")
  const wordTokens = cleanWord.split(/\s+/).filter(token => token.length > 3);
  for (const token of wordTokens) {
    // Avoid basic matching if token is substring of a word in hint
    const hintTokens = cleanHint.split(/[\s,.-]+/);
    if (hintTokens.includes(token)) {
      return false;
    }
  }

  return true;
}

/**
 * Maximum allowed imposters for given player count
 */
export function getMaxImposters(playerCount: number): number {
  if (playerCount < MIN_PLAYERS) return 1;
  return Math.max(1, Math.floor(playerCount / 3));
}

/**
 * Validates the full game setup
 */
export function validateGameSetup(
  players: Player[],
  imposterCount: number,
  category: string
): { isValid: boolean; error: string | null; duplicateNames?: string[] } {
  if (players.length < MIN_PLAYERS) {
    return { isValid: false, error: `Minimum of ${MIN_PLAYERS} players required.` };
  }

  if (players.length > MAX_PLAYERS) {
    return { isValid: false, error: `Maximum of ${MAX_PLAYERS} players supported.` };
  }

  // Empty name check
  const emptyIndex = players.findIndex(p => !p.name || p.name.trim().length === 0);
  if (emptyIndex !== -1) {
    return { isValid: false, error: `Player ${emptyIndex + 1} needs a name.` };
  }

  // Duplicate name check (case-insensitive)
  const trimmedNames = players.map(p => p.name.trim());
  const lowerNames = trimmedNames.map(n => n.toLowerCase());
  const duplicates: string[] = [];
  const seen = new Set<string>();

  lowerNames.forEach((name, idx) => {
    if (seen.has(name)) {
      duplicates.push(trimmedNames[idx]);
    } else {
      seen.add(name);
    }
  });

  if (duplicates.length > 0) {
    return { 
      isValid: false, 
      error: `Duplicate player name: "${duplicates[0]}". Names must be unique.`,
      duplicateNames: duplicates
    };
  }

  // Imposter count bounds
  const maxImposters = getMaxImposters(players.length);
  if (imposterCount < 1) {
    return { isValid: false, error: "Must have at least 1 imposter." };
  }
  if (imposterCount > maxImposters) {
    return { isValid: false, error: `For ${players.length} players, maximum imposters allowed is ${maxImposters}.` };
  }

  // Available words in category
  const availableWords = getWordsByCategory(category);
  if (!availableWords || availableWords.length === 0) {
    return { isValid: false, error: `No words available for category "${category}".` };
  }

  return { isValid: true, error: null };
}
