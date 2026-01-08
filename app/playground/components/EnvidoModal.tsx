import { EnvidoModalProps } from '@/app/interfaces/propsInterfaces';
import React from 'react';

export const EnvidoModal = ({
  hasWon,
  setEnvidoWinnerId,
  playersEnvido,
  oponentsEnvido
}: EnvidoModalProps) => {

  const onClose = () => setEnvidoWinnerId(-1);


  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      
      {/* Contenedor del modal */}
      <div className="w-full max-w-sm bg-[var(--color-primary)] rounded-t-3xl p-4 shadow-xl animate-slide-up">
        
        {/* Header */}
        <h2 className="text-center text-xl font-extrabold mb-4">
          Resultado del Envido
        </h2>

        {/* Resultados */}
        <div className="flex flex-col gap-3 mb-4">

          {/* Oponente */}
          <div
            className={`
              flex items-center justify-between
              rounded-xl px-4 py-3
              ${hasWon
                ? 'bg-red-500/20 text-red-300'
                : 'bg-green-500/20 text-green-300'}
            `}
          >
            <span className="text-sm uppercase tracking-wide">
              Oponente
            </span>
            <span className="text-xl font-bold">
              {oponentsEnvido}
            </span>
          </div>

          {/* Yo */}
          <div
            className={`
              flex items-center justify-between
              rounded-xl px-4 py-3
              ${hasWon
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'}
            `}
          >
            <span className="text-sm uppercase tracking-wide">
              Yo
            </span>
            <span className="text-xl font-bold">
              {playersEnvido}
            </span>
          </div>

        </div>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="w-full py-2 text-sm text-gray-300"
        >
          Cerrar
        </button>

      </div>
    </div>
  );
};
