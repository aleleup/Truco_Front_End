import { CardsOnTheDeskProps } from '@/app/interfaces/propsInterfaces'
import React from 'react'

export const CardsOnTheDesk = ({ownCards, opponentCards}: CardsOnTheDeskProps) => {
  return (
    <section className="flex-1 flex items-start justify-center px-2 pt-4">
        <div className="w-full max-w-md  rounded-2xl p-4 space-y-3 ">

            {/* Mensaje oponente */}
            <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wide text-gray-300">
                {opponentCards.map(card => card.ascii_art)}
                </span>
                
            </div>

            {/* Separador */}
            <div className="h-px bg-white/10" />

            {/* Mensaje propio */}
            <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wide text-gray-300">
                    {ownCards.map(card => card.ascii_art)}
                </span>
                
            </div>

        </div>
    </section>  
    
)
}
