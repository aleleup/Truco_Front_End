import { CardKey } from '@/app/interfaces/gameDataFlowInterfaces'
import { CardsOnTheDeskProps } from '@/app/interfaces/propsInterfaces'
import { cardAsciiStorage } from '@/public/cards'
import React from 'react'

export const CardsOnTheDesk = ({ownCards, opponentCards}: CardsOnTheDeskProps) => {
  return (
    <section className="flex-1 flex items-start justify-center px-2 pt-4">
        <div className="w-full max-w-md  rounded-2xl p-4 space-y-3 ">

            {/* Mensaje oponente */}
            <div className="flex space-x-1 font-mono">
            {opponentCards.map(card => {
                const cardKey: CardKey = `${card.number}&${card.type}`
                return (
                <pre key={cardKey} className="text-gray-300">
                    {cardAsciiStorage[cardKey]}
                </pre>
                )
            })}
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex space-x-1 font-mono">
            {ownCards.map(card => {
                const cardKey: CardKey = `${card.number}&${card.type}`
                return (
                <pre key={cardKey} className="text-gray-300">
                    {cardAsciiStorage[cardKey]}
                </pre>
                )
            })}
            </div>

        </div>
    </section>  
    
)
}
