"use client";

import { useGameState } from "@/hooks/useGameState";
import HomeScreen from "@/components/HomeScreen";
import GameSetup from "@/components/GameSetup";
import PassPhoneScreen from "@/components/PassPhoneScreen";
import RevealScreen from "@/components/RevealScreen";
import ReadyScreen from "@/components/ReadyScreen";
import StarterSelection from "@/components/StarterSelection";
import CluePhase from "@/components/CluePhase";
import GameOver from "@/components/GameOver";

export default function Home() {
  const { state } = useGameState();

  const renderPhase = () => {
    switch (state.phase) {
      case "home":
        return <HomeScreen key="home" />;
      case "setup":
        return <GameSetup key="setup" />;
      case "pass-phone":
        return <PassPhoneScreen key="pass-phone" />;
      case "reveal":
        return <RevealScreen key={`reveal-${state.currentRevealIndex}`} />;
      case "ready-to-start":
        return <ReadyScreen key="ready-to-start" />;
      case "starter-selection":
        return <StarterSelection key="starter-selection" />;
      case "clue-phase":
        return <CluePhase key="clue-phase" />;
      case "game-over":
        return <GameOver key="game-over" />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-md mx-auto w-full relative overflow-hidden">
      <div className="w-full flex-1 flex flex-col">{renderPhase()}</div>
    </main>
  );
}
