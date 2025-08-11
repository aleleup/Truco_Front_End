'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const redirectToSpecificPage = (id: Number, rediirectPlayer: Function):void => {
    rediirectPlayer(`/player/${id}`)
  }
  
  const router = useRouter();
  const extraBasicPlayerArray: Array<Object> = []
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Truco</h1>
      <span>Si, me hinche las bolas de codear un bot de 47214218 ifs y ahora migre el proyecto a una pwa.</span>
      <h2>Elegir jugador</h2>
      <div className="flex space-x-5">
        <button onClick={() => redirectToSpecificPage(1, router.push)}>Jugador 1</button>
        <button onClick={() => redirectToSpecificPage(2, router.push)}>Jugador 2</button>
      </div>
    </div>
  );
}
