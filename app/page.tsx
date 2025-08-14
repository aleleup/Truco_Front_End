'use client'
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();
  const forEachArray = [0,1];


  const redirectToSpecificPage = (id: number):void => {
    router.push(`/playground?pgid=${id}`)
  }
 
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Truco</h1>
      <span>Si, me hinche las bolas de codear un bot de 47214218 ifs y ahora migre el proyecto a una pwa.</span>
      <h2>Elegir jugador</h2>
      <div className="flex space-x-5">
        {forEachArray.map((num) => <button key={num} onClick={() => redirectToSpecificPage(num)}>Jugador {num+1}</button>)}
      </div>
    </div>
  );
}
