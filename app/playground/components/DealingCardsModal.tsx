'use client';
import React from 'react';

export default function DealingCardsModal() {

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[90%] max-w-sm rounded-3xl bg-[var(--color-primary)] p-6 text-center shadow-xl border border-green-400">
            <h2 className="text-3xl font-extrabold text-green-400 mb-4">
                Cargando nueva mano.
            </h2>

            <div className="text-6xl mb-4">⌛️</div>

            
          </div>
        </div>
    );
}
