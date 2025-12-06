'use client';

import React from 'react';
import { ActionModalProps } from '@/app/interfaces/propsInterfaces';



export default function ActionModal({buttonsArray, onClose, setBet}: ActionModalProps) {

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      
      {/* Contenedor del modal */}
      <div className="w-full max-w-sm bg-[var(--color-primary)] rounded-t-3xl p-4 shadow-xl animate-slide-up">
        
        {/* Botón cerrar (opcional) */}
        {onClose && (
          <button
            onClick={onClose}
            className="mb-3 w-full text-center text-sm text-gray-300"
          >
            Cerrar
          </button>
        )}

        {/* Lista de botones */}
        <div className="flex flex-col gap-3">
          {buttonsArray.map((bet, index) => (
            <button
              key={index}
              onClick={() => setBet(bet)}
              className="
                w-full py-4
                bg-[var(--color-secondary)]
                text-white font-bold text-lg
                rounded-xl
                shadow-md
                active:scale-95
                transition
              "
            >
              {bet}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}