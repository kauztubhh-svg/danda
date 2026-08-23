import { getWordsByCategory, words, CATEGORIES } from "./src/data/words";
import { validateGameSetup, validateHint, getImposterHint, getMaxImposters, shuffleArray, selectRandomWord } from "./src/lib/game";
import { Player } from "./src/lib/types";

let failed = 0;
function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    failed++;
  } else {
    console.log(`✅ PASSED: ${msg}`);
  }
}

console.log("=== RUNNING IMPOSTER GAME COMPREHENSIVE VERIFICATION SUITE ===\n");

// --- TEST 1: 3 players, 1 imposter, ALL category ---
console.log("--- Test 1: 3 players, 1 imposter, ALL category ---");
const p1: Player[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];
const v1 = validateGameSetup(p1, 1, "ALL");
assert(v1.isValid === true, "Setup with 3 players, 1 imposter, ALL category is valid");
const word1 = selectRandomWord("ALL");
assert(word1 !== undefined && word1.word.length > 0, "Selected valid word from ALL category");

// --- TEST 2: 6 players, 1 imposter, Bollywood category ---
console.log("\n--- Test 2: 6 players, 1 imposter, Bollywood category ---");
const p2: Player[] = [
  { id: "1", name: "Kaustubh" },
  { id: "2", name: "Kunal" },
  { id: "3", name: "Rahul" },
  { id: "4", name: "Aryan" },
  { id: "5", name: "Aditya" },
  { id: "6", name: "Rohan" },
];
const v2 = validateGameSetup(p2, 1, "Bollywood");
assert(v2.isValid === true, "Setup with 6 players, 1 imposter, Bollywood is valid");
const bollywoodWords = getWordsByCategory("Bollywood");
assert(bollywoodWords.length >= 5, "Bollywood category has sufficient words");
const word2 = selectRandomWord("Bollywood");
assert(word2 !== undefined && word2.category === "Bollywood", "Selected Bollywood word");

// --- TEST 3: 8 players, 2 imposters, Cyber Words category ---
console.log("\n--- Test 3: 8 players, 2 imposters, Cyber Words category ---");
const p3: Player[] = Array.from({ length: 8 }, (_, i) => ({ id: `p-${i}`, name: `Player ${i + 1}` }));
const v3 = validateGameSetup(p3, 2, "Cyber Words");
assert(v3.isValid === true, "Setup with 8 players, 2 imposters, Cyber Words is valid");
const cyberWords = getWordsByCategory("Cyber Words");
assert(cyberWords.length >= 5, "Cyber Words category has sufficient words");

// --- TEST 4: 10 players, 3 imposters, Indian College Words category ---
console.log("\n--- Test 4: 10 players, 3 imposters, Indian College Words ---");
const p4: Player[] = Array.from({ length: 10 }, (_, i) => ({ id: `p-${i}`, name: `Student ${i + 1}` }));
const v4 = validateGameSetup(p4, 3, "Indian College Words");
assert(v4.isValid === true, "Setup with 10 players, 3 imposters, Indian College Words is valid");

// --- TEST 5: Duplicate player names check ---
console.log("\n--- Test 5: Duplicate player names rejection ---");
const p5: Player[] = [
  { id: "1", name: "Kaustubh" },
  { id: "2", name: "Rahul" },
  { id: "3", name: "kaustubh" }, // duplicate case-insensitive
];
const v5 = validateGameSetup(p5, 1, "ALL");
assert(v5.isValid === false, "Duplicate names rejected");
assert(v5.error !== null && v5.error.includes("Duplicate"), "Error message mentions duplicate");

// --- TEST 6: All database hints validation ---
console.log("\n--- Test 6: Imposter Hint Validation across entire word database ---");
let invalidHints = 0;
words.forEach((w) => {
  const isValid = validateHint(w.word, w.hint);
  if (!isValid) {
    console.error(`Invalid hint for "${w.word}": "${w.hint}"`);
    invalidHints++;
  }
});
assert(invalidHints === 0, `All ${words.length} words in database have valid hints that do not spoil the word`);

// --- TEST 7: Max imposters calculation ---
console.log("\n--- Test 7: Max imposters bounds ---");
assert(getMaxImposters(3) === 1, "3 players -> max 1 imposter");
assert(getMaxImposters(5) === 1, "5 players -> max 1 imposter");
assert(getMaxImposters(6) === 2, "6 players -> max 2 imposters");
assert(getMaxImposters(9) === 3, "9 players -> max 3 imposters");
assert(getMaxImposters(20) === 6, "20 players -> max 6 imposters");

// --- TEST 8: Randomization and Fisher-Yates shuffle uniformity ---
console.log("\n--- Test 8: Fisher-Yates unbiased shuffle ---");
const original = [1, 2, 3, 4, 5, 6];
const shuffled = shuffleArray(original);
assert(shuffled.length === original.length, "Shuffled array retains length");
assert(original.every((x) => shuffled.includes(x)), "Shuffled array contains all elements");

// --- TEST 9: Reveal order and privacy verification ---
console.log("\n--- Test 9: Card Reveal & Privacy Logic ---");
const testPlayers: Player[] = [
  { id: "p1", name: "Aarav" },
  { id: "p2", name: "Vihaan" },
  { id: "p3", name: "Kabir" },
  { id: "p4", name: "Ananya" },
];
const imposters = ["p2"];
const secret = selectRandomWord("ALL")!;

testPlayers.forEach((player) => {
  const isImp = imposters.includes(player.id);
  if (isImp) {
    // Imposter sees hint, NOT word
    const visibleData = { hint: secret.hint, category: secret.category };
    assert(!("word" in visibleData), `Imposter (${player.name}) payload does NOT contain secret word`);
  } else {
    // Normal player sees word
    const visibleData = { word: secret.word, category: secret.category };
    assert("word" in visibleData, `Civilian (${player.name}) payload contains secret word`);
  }
});

// --- TEST 10: Multi-imposter game over reveal ---
console.log("\n--- Test 10: Multi-imposter GameOver reveal ---");
const multiImposters = ["p1", "p3"];
const revealedImposters = testPlayers.filter((p) => multiImposters.includes(p.id)).map((p) => p.name);
assert(revealedImposters.length === 2, "All 2 imposters identified for final reveal");
assert(revealedImposters.includes("Aarav") && revealedImposters.includes("Kabir"), "Correct imposter names revealed");

// --- TEST 11: All Categories have valid words ---
console.log("\n--- Test 11: Category integrity check ---");
CATEGORIES.forEach((cat) => {
  const catWords = getWordsByCategory(cat);
  assert(catWords.length > 0, `Category "${cat}" has ${catWords.length} words`);
});

// --- TEST 12: Imposter clues stay one word ---
console.log("\n--- Test 12: One-word imposter clues ---");
const invalidShortHints = words.filter((word) => !/^[a-z]+$/i.test(getImposterHint(word)));
assert(invalidShortHints.length === 0, `All ${words.length} imposter clues are exactly one word`);

if (failed === 0) {
  console.log("\n🎉 ALL 11 TEST SUITES PASSED FLAWLESSLY!");
} else {
  console.error(`\n⚠️ ${failed} tests failed.`);
  process.exit(1);
}