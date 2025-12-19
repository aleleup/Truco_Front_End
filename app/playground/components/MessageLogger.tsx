import { MessageLoggerProps } from '@/app/interfaces/propsInterfaces'
import React from 'react'

export const MessageLogger = ({ownLastMessage, ownPoints, opponentLastMessage, opponentPoints,}: MessageLoggerProps) => {
  return (
    <section className="flex-1 flex items-start justify-center px-2 pt-4">
        <div className="w-full max-w-md  rounded-2xl p-4 space-y-3 ">

            {/* Mensaje oponente */}
            <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wide text-gray-300">
                    Oponente ({opponentPoints})
                </span>
                <span className="text-lg font-bold text-[var(--color-secondary)]">
                    {opponentLastMessage}
                </span>
            </div>

            {/* Separador */}
            <div className="h-px bg-white/10" />

            {/* Mensaje propio */}
            <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wide text-gray-300">
                    Yo ({ownPoints})
                </span>
                <span className="text-lg font-bold text-green-400">
                    {ownLastMessage}
                </span>
            </div>

        </div>
    </section>  
    )
}
