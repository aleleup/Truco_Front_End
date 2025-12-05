'use client'
import React, { useState } from 'react';
import { buttonWithWsProps } from '@/app/interfaces/componentsInterfaces';

export const ButtonWithWs = ({isButtonEnabled, setIsButtonEnabled}: buttonWithWsProps) => {
    const [titleButton, setTitleButton] = useState<String>("Empezar Juego");
      const connectToWs = () => {
        setTitleButton("Conectandose...")
        setIsButtonEnabled(false)
    }
    return (
        <button
            onClick={connectToWs}
            disabled={!isButtonEnabled}
            className="
            my-14
            disabled:bg-gray-400
            px-12 py-4
            text-2xl font-bold
            bg-[var(--color-secondary)]
            text-white
            rounded-2xl
            shadow-lg
            hover:brightness-110 hover:scale-105
            active:scale-95
            transition-all duration-200
            "
        >
            {titleButton}
        </button>
    )
}
