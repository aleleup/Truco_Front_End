import { useEffect, useRef, useState } from "react";
import { useWebSockeInterface, gameEntrance } from "@/app/interfaces/hooksInterfaces";

export function useWebSocket(url: string): useWebSockeInterface {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<gameEntrance>(null);

    useEffect(() => {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);

        ws.onmessage = (event) => {
        setLastMessage(JSON.parse(event.data));
        };

        return () => ws.close();
    }, [url]);
    const send = (data: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        wsRef.current.send(JSON.stringify(data));
    };

    return { connected, lastMessage, send };

}