'use client';

import { useIdStore } from '@/hooks/useIdStore';
import React, {useEffect, useState} from 'react';
import { PlayerOptions, PlayersAction } from '../interfaces/gameEntranceInterfaces';
import ActionModal from './components/ActionModal';

function PlayGround() {
  const { id } = useIdStore();
  const [playersCards, setPlayersCards] = useState<Array<string>>([]);
  const [playerOptions, setPlayerOptions] = useState<PlayerOptions | null>(null);
  const [cardSelected, setCardSelected] = useState<number>(-1);
  const [optionSelected, setOptionSelected] = useState<keyof PlayerOptions | null>(null);
  const [betSelected, setBetSelected] = useState<string>("");
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // MOCK-UP DATA
  useEffect(() => {
    setPlayersCards(["1 🗡️", " 1 🪾", "7 🗡️"]);
    setPlayerOptions({
      Envido: {
        0: "Envido",
        1: "Real Envido",
        2: "Falta Envido"
      },
      Truco: "Truco",
      Respuesta: {
        0: "Quiero",
        1: "No Quiero"
      }
    })
  }, []);

  function typedKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  }

  function closeModal(): void {
    setOptionSelected(null);
    setOpenModal(false);
  }

  function createButtonsArray<T extends keyof PlayerOptions | null>(optionSelected: T): string[]{
    if (!playerOptions || !optionSelected ) return [];
    const selected = playerOptions[optionSelected];
    if (typeof selected === "string") return [selected];
    if (!selected) return [];
    return Object.values(selected);
  };

  function setBetAndCloseModal(bet:string):void{
    setBetSelected(bet);
    setOpenModal(false);
  };

  function setMessageToServer(): PlayersAction{
    const bet: Array<string> = optionSelected && betSelected ? [optionSelected, betSelected] : [];
    return {
      bet,
      card_index: cardSelected
    }
  }

  useEffect(() => {
    console.log(" Final MESSAGE: ", setMessageToServer());

  }, [cardSelected]);

  useEffect(() => {  
    console.log(" Final MESSAGE: ", setMessageToServer());

 }, [betSelected]);

  return (
    <main className="min-h-screen flex flex-col bg-[var(--color-primary)] text-white p-4">
      {/* MODAL */}

      {openModal && <ActionModal onClose={closeModal } buttonsArray={createButtonsArray(optionSelected)} setBet={setBetAndCloseModal}/>}

      {/* Zona superior (mesa / estado del juego) */}
      <section className="flex-1 flex items-center justify-center">
        <h2 className="text-2xl font-semibold opacity-80">
          Bienvenido al playground
        </h2>
      </section>

      {/* Zona inferior de botones */}
      <section className="w-full flex flex-col gap-4">

        {/* Cartas */}
        <div className="grid grid-cols-3 gap-4">
          {playersCards.length && playersCards.map((card, i) => (
              <button key={i} 
                onClick={() => setCardSelected(i)}
                disabled={!isPlayerTurn} 
                className="disabled:bg-gray-400 bg-[var(--color-secondary)] py-4 rounded-xl text-xl font-bold shadow-md active:scale-95 transition"
                >
                {card}
              </button>
          ))}
        </div>

        {/* Envido / Truco / Responder */}
        <div className="grid grid-cols-3 gap-4">
          { playerOptions !== null && typedKeys(playerOptions).map((option, i)=> (
            <button 
              onClick={() => {
                setOpenModal(true)
                setOptionSelected(option)
              }
              }
              key={i}
              disabled={!isPlayerTurn} 
              className="disabled:bg-gray-400 bg-blue-600 py-5 rounded-xl text-xl font-extrabold shadow-lg active:scale-95 transition">
            {option}
          </button>
          )) }
        </div>
       
      </section>
    </main>
  );
}

export default PlayGround;
