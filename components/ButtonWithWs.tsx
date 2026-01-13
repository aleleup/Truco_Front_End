'use client'
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { buttonWithWsProps } from '@/app/interfaces/propsInterfaces';

import { useWebSocket } from '@/hooks/useWebSocket';
import { useIdStore } from '@/hooks/useIdStore';

export const ButtonWithWs = ({isButtonEnabled, setIsButtonEnabled}: buttonWithWsProps) => {
    const [titleButton, setTitleButton] = useState<string>("Empezar Juego");
    const [url, setUrl] = useState<string>('');
    const {messages} = useWebSocket(url)

    const router = useRouter();
    const {id, setNewId, session} = useIdStore();
    
    const connectToWs = async () => {
        setTitleButton("Conectandose...")
        setIsButtonEnabled(false);
        const newId = Math.random()
        await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/store-session-id/${session}`)
        setUrl(`${process.env.NEXT_PUBLIC_ENDPOINT}/enter-lobby/${session}/${newId}`)
    }

    useEffect(() => {
        /*
        messages EXPECTED: [{new_id: int}, {allow_access: bool}].
        THIS IS HOW IT IS EXPECTED TO BE.
        */
        if (!messages.length) return;
        messages.forEach((msg) => {
            if (!msg) return;
            if ("new_id" in msg) {
            setNewId(msg.new_id);
            } else if ("allow_access" in msg && msg.allow_access) {
                setTitleButton("Arrancando juego...");
                setTimeout(() => router.push("/playground"), (id === 1 ? 4000 : 2000));
            }
    })
    }, [messages]);

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
