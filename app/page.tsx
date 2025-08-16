'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {

  const router = useRouter();
  const idsArray = [0,1];


 
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Truco</h1>
      <span>Si, me hinche las bolas de codear un bot de 47214218 ifs y ahora migre el proyecto a una pwa.</span>
      <h2>Elegir jugador</h2>
      <div className="flex space-x-5">
        {idsArray.map((id) => <Link key={id} href={`/playground?pgid=${id}`} target="_blank">Jugador {id+1}</Link>)}
      </div>
    </div>
  );
}
