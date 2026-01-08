'use state'
import { MessageLoggerProps } from '@/app/interfaces/propsInterfaces'
import React, { useEffect, useState } from 'react'

export const MessageLogger = ({
    ownLastMessage, 
    ownPoints, 
    ownBetCallsAmount,
    opponentLastMessage, 
    opponentPoints,
    opponentBetCallsAmount}: MessageLoggerProps) => {

    const [lastOwnBetAmmount, setLastOwnBetAmmount] = useState(0);
    const [lastOpponentBetAmmount, setLastOpponentBetAmmount] = useState(0);
    const [lightOwnBg, setLightOwnBg] = useState(false);
    const [lightOpponentBg, setLightOpponentBg] = useState(false);

    useEffect(() => {
        if (lastOwnBetAmmount < ownBetCallsAmount) {
            setLastOwnBetAmmount(ownBetCallsAmount);
            setLightOwnBg(true);
            setTimeout(() => setLightOwnBg(false), 1000)
        };
        if (lastOpponentBetAmmount < opponentBetCallsAmount) {
            setLastOpponentBetAmmount(opponentBetCallsAmount);
            setLightOpponentBg(true);
            setTimeout(() => setLightOpponentBg(false), 1000);
        }
    }, [ownBetCallsAmount, opponentBetCallsAmount])
  return (
    <section className="flex-1 flex items-start justify-center px-2 pt-4">
  <div className="w-full max-w-md rounded-2xl p-4 space-y-3">

    {/* Mensaje oponente */}
    <div
      className={`
        flex items-center justify-between
        rounded-xl px-3 py-2
        transition-all duration-300 ease-out
        ${lightOpponentBg
          ? 'bg-blue-500/20 scale-[1.03] shadow-lg shadow-blue-500/30 animate-pulse'
          : 'bg-transparent scale-100'}
      `}
    >
      <span className="text-sm uppercase tracking-wide text-gray-300">
        Oponente ({opponentPoints})
      </span>
      <span
        className={`
          text-lg font-bold transition-colors duration-300
          ${lightOpponentBg ? 'text-blue-300' : 'text-blue-400'}
        `}
      >
        {opponentLastMessage}
      </span>
    </div>

    {/* Separador */}
    <div className="h-px bg-white/10" />

    {/* Mensaje propio */}
    <div
      className={`
        flex items-center justify-between
        rounded-xl px-3 py-2
        transition-all duration-300 ease-out
        ${lightOwnBg
          ? 'bg-green-500/20 scale-[1.03] shadow-lg shadow-green-500/30 animate-pulse'
          : 'bg-transparent scale-100'}
      `}
    >
      <span className="text-sm uppercase tracking-wide text-gray-300">
        Yo ({ownPoints})
      </span>
      <span
        className={`
          text-lg font-bold transition-colors duration-300
          ${lightOwnBg ? 'text-green-300' : 'text-green-400'}
        `}
      >
        {ownLastMessage}
      </span>
    </div>

  </div>
</section>
 
    )
}
