'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { buttonWithWsProps } from '@/app/interfaces/propsInterfaces';

import { useWebSocket } from '@/hooks/useWebSocket';
import { useIdStore } from '@/hooks/useIdStore';

export const ButtonWithWs = ({isButtonEnabled, setIsButtonEnabled}: buttonWithWsProps) => {
    const [titleButton, setTitleButton] = useState<String>("Empezar Juego");
    const [url, setUrl] = useState<string>('');
    const {lastMessage} = useWebSocket(url)

    const router = useRouter();
    const {setNewId} = useIdStore();
    
    const connectToWs = () => {
        setTitleButton("Conectandose...")
        setIsButtonEnabled(false)
        setUrl(`${process.env.NEXT_PUBLIC_ENDPOINT}/enter-lobby/${Math.random()}`)
    }

    useEffect(() => {
        if (!lastMessage) return;
        if ('new_id' in lastMessage){
            setNewId(lastMessage.new_id)
        }
        if ('allow_access' in lastMessage){
            const allowAccess = lastMessage.allow_access;
            if (allowAccess){
                setTitleButton("Arrancando juego...")
                setTimeout(() => router.push("/playground"), 3000)
        }
    }

    },[lastMessage])
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
