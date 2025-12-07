import { useEffect, useRef, useState } from "react";
import { useWebSockeInterface } from "@/app/interfaces/hooksInterfaces";
import { gameDataFlow } from "@/app/interfaces/gameDataFlowInterfaces";

export function useWebSocket(url: string): useWebSockeInterface {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<gameDataFlow[]>([]);

    useEffect(() => {
        // if (wsRef.current) return; // ✅ prevents double connect

        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);

        ws.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        setMessages(prev => [...prev, parsed]);
        };

        return () => ws.close();
    }, [url]);
    const send = (data: gameDataFlow) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        wsRef.current.send(JSON.stringify(data));
    };

    return { connected, messages, send };

}