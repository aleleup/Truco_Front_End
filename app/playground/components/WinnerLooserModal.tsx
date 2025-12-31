'use client';

import { WinnerLooserModalProps } from '@/app/interfaces/propsInterfaces';
import React from 'react';

export default function WinnerLooserModal({
  hasWinned,
}: WinnerLooserModalProps) {

  return (
    <>
      {/* MODAL GANADOR */}
      {hasWinned && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[90%] max-w-sm rounded-3xl bg-[var(--color-primary)] p-6 text-center shadow-xl border border-green-400">
            <h2 className="text-3xl font-extrabold text-green-400 mb-4">
              ¡Ganaste!
            </h2>

            <p className="text-white/80 mb-6">
              Bien jugado. Te llevaste la mano.
            </p>

            <div className="text-6xl mb-4">⚔️</div>

            
          </div>
        </div>
      )}

      {/* MODAL PERDEDOR */}
      {!hasWinned && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[90%] max-w-sm rounded-3xl bg-[var(--color-primary)] p-6 text-center shadow-xl border border-red-500">
            <h2 className="text-3xl font-extrabold text-red-400 mb-4">
              Perdiste
            </h2>

            <p className="text-white/80 mb-6">
              Esta mano no fue tuya.
            </p>

            <div className="text-6xl mb-4">💥</div>

          </div>
        </div>
      )}
    </>
  );
}
