'use client'
import { ButtonWithWs } from "@/components/ButtonWithWs";
import { useEffect, useState } from "react";
import { useIdStore } from '@/hooks/useIdStore';

export default function Home() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [fixedSessionId, setFixedSessionId] = useState<number | null>(null);
  const {setNewSession} = useIdStore()
  useEffect(() => {
    const randomSession = Math.floor(Math.random() * 10 ** 16);
    setFixedSessionId(randomSession);
    setNewSession(randomSession);
  }, []);

    return (
     <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-primary)] text-white font-sans px-6">
  
  {/* Title */}
  <h1 className="text-6xl font-extrabold tracking-wide mb-12 drop-shadow-lg">
    Truco
  </h1>

  {/* Card */}
  <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col gap-6">
    
    {/* Session code */}
    <div className="text-center">
      <p className="text-sm uppercase tracking-widest text-white/70 mb-1">
        Código de sesión
      </p>
      <p className="text-2xl font-mono font-semibold bg-black/40 rounded-lg py-2 px-4 select-all">
        {fixedSessionId /* @TODO:  copy to clipboard */}
      </p>
    </div>

    {/* Description */}
    <p className="text-center text-white/80 text-sm leading-relaxed">
      Copiá este código y pasáselo a un amigo, o pegá el código que te enviaron
      para unirte a su partida.
    </p>

    {/* Input */}
    <input
      type="text"
      placeholder="Código de contrincante"
      className="
        w-full
        rounded-xl
        bg-black/40
        border border-white/20
        px-4 py-3
        text-center
        text-lg
        font-mono
        placeholder:text-white/40
        focus:outline-none
        focus:ring-2
        focus:ring-white/50
        transition
      "
      onChange={(e) =>
        setNewSession(
        Number(e.target.value.trim())
        )
      }
    />

    {/* Button */}
    <ButtonWithWs
      isButtonEnabled={isButtonEnabled}
      setIsButtonEnabled={setIsButtonEnabled}
      
    />
  </div>
</main>

    );
}
