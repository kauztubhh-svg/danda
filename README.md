# 🕵️ IMPOSTER — Pass & Play Party Game

A mobile-first, pass-the-phone web party game for 3 to 20 players on a single device.

Built with **Next.js**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🎮 How the Game Works

1. **Setup**:
   - Set the number of players (3 to 20).
   - Enter each player's name (with duplicate detection & autofocus flow).
   - Choose the number of imposters (`floor(players / 3)` limit).
   - Select a word category (Default: `ALL`, or themed categories like Bollywood, Cyber Words, Indian College Words, Sports, etc.).

2. **Pass & Private Reveal**:
   - The phone is passed to each player in randomized sequence.
   - Each player **presses and holds** their card (with an animated progress indicator).
   - **Civilian Players** see the **Secret Word** and the category.
   - **Imposter(s)** see **ONLY a vague Hint** — the secret word is **never** shown or exposed in the DOM.
   - Releasing early resets progress, preventing accidental reveals.
   - Tapping **Hide Card** immediately cleans the screen for the next player.

3. **Starter Selection**:
   - A quiet animated roulette chooses a **random starting player**.

4. **Clue Phase**:
   - Players take turns giving a short clue verbally in circular order.
   - **No timers**: The group controls the pace manually.

5. **Discussion, Voting & Reveal**:
   - Discuss clues and vote on who the imposter is.
   - Tap **End Game** (with safe confirmation modal).
   - The **Secret Word**, **Imposter(s)**, and their hints are dramatically revealed.
   - Tap **Start Another Game** to immediately replay with preserved settings and a fresh secret word.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or Node 20+)
- npm or yarn or pnpm

### Installation & Running Locally

```bash
# Clone or navigate to the project directory
cd imposter-game

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your mobile or desktop browser.

### Building for Production

```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
imposter-game/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # App wrapper, Google Font, viewport, GameProvider
│   │   ├── page.tsx           # Dynamic GamePhase state router with AnimatePresence
│   │   └── globals.css        # Tailwind v4, custom scrollbars, safe areas
│   ├── components/
│   │   ├── HomeScreen.tsx       # Landing screen and rules access
│   │   ├── GameSetup.tsx        # Player count, inputs, imposter count, category picker
│   │   ├── PlayerInputs.tsx     # Enter-key navigation, duplicate name validation
│   │   ├── ImposterSelector.tsx # Stepper with dynamic bounds
│   │   ├── CategorySelector.tsx # Modal grid with badge counts & ALL default
│   │   ├── PassPhoneScreen.tsx  # Pass-the-phone privacy checkpoint
│   │   ├── RevealScreen.tsx     # Silent pointer-event press-and-hold radial progress
│   │   ├── NormalPlayerCard.tsx # Civilian view (Secret Word)
│   │   ├── ImposterCard.tsx     # Imposter view (Hint only; no secret word)
│   │   ├── ReadyScreen.tsx      # All cards seen checkpoint
│   │   ├── StarterSelection.tsx # Animated roulette selection
│   │   ├── CluePhase.tsx        # Turn tracker, round indicator, End Game button
│   │   ├── EndGameDialog.tsx    # Confirmation modal
│   │   ├── GameOver.tsx         # Results, imposter reveal, replay buttons
│   │   └── HowToPlay.tsx        # Comprehensive rules guide modal
│   ├── data/
│   │   └── words.ts           # Word database & category filtering
│   ├── hooks/
│   │   └── useGameState.tsx   # React Context state machine & local storage sync
│   ├── lib/
│   │   ├── game.ts            # Fisher-Yates shuffle, validation, word selection
│   │   └── types.ts           # GamePhase, Player, WordEntry, GameState interfaces
└── test-game-logic.ts         # Automated test verification suite
```

---

## 📚 Adding Custom Words & Categories

All word entries are managed in [`src/data/words.ts`](src/data/words.ts).

To add a new word:
```typescript
{
  word: "Zero Trust",
  category: "Cybersecurity",
  hint: "Never trust, always verify architecture",
  difficulty: "medium"
}
```

> **Hint Rule**: Hints must **never** contain the secret word or direct variants. The test suite automatically verifies this across the entire dataset (`npm run test` or `npx tsx test-game-logic.ts`).

---

## 🌐 Deployment

The entire application runs **100% client-side** with zero external backend dependencies. It can be deployed instantly to:

- **Vercel**: Import repository and deploy with Next.js presets.
- **Netlify**: Connect repository and set build command to `npm run build`.
- **Cloudflare Pages / GitHub Pages**: Export statically if desired.