'use client'
import { ButtonWithWs } from "@/components/ButtonWithWs";
import { useEffect, useState } from "react";

export default function Home() {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);
  const trucoPhases:Array<string>  = [
    "Una vez una paloma ofreció darme su nido,y yo creyendo una bromano le eché la Falta envido.", 
    "Los gauchos del General peleaba con trabuco, yo peleo con tres cartas porque estoy jugando al Truco.", 
    "Vamos medio derrotados pero no le temo al cuco; pues cantan los colorados Falta envido y truco."];
  const [actualPhase, setActualPhase] = useState<string>("")
  const [i, setI] = useState<number>(0)

  useEffect(() => {
    if (!isButtonEnabled){
      const interval = setInterval(() => {
        setI(prev => prev + 1 >= trucoPhases.length ? 0 : prev + 1);
      }, 6000); // 3 seconds

      return () => clearInterval(interval); 
    }
}, [isButtonEnabled]);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-primary)] text-white font-sans p-8">
      
      {/* Title */}
      <h1 className="text-6xl font-extrabold tracking-wide mb-12 drop-shadow-lg">
        Truco
      </h1>
      <span>{!isButtonEnabled && trucoPhases[i]}</span>
      <ButtonWithWs isButtonEnabled={isButtonEnabled} setIsButtonEnabled={setIsButtonEnabled}/>
    </main>
  );
}
