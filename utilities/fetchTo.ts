import { wsActionsInterface } from "@/app/interfaces/playgroundInterfaces";

export interface Payload<T> {
    error: boolean,
    payload: T
}

export async function genericGetTo<T>(path: string):Promise<Payload<T>>{
    const endpoint: string | undefined = process.env.NEXT_PUBLIC_ENDPOINT;
    const returnStructure:  Payload<T> = {
        error: false,
        payload: null as T
    }
    try {
       const data = await fetch(`${endpoint}/${path}`);
       const parsedData = await data.json();

       returnStructure.payload = parsedData.body
    } 
    catch (error) {
        console.error(error);
        returnStructure.error = true
    }
    finally {
        return returnStructure
    }
}


export async function genericPostTo<T>(path: string, body: object): Promise<Payload<T>>{
    console.log("STARTING GENERIC POST WITH", path, body)
    const endpoint: string | undefined = process.env.NEXT_PUBLIC_ENDPOINT;
    const returnStructure:  Payload<T> = {
        error: false,
        payload: null as T
    }
    try {
       const data = await fetch(`${endpoint}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
       });
       console.log("DATA: ", data)
       const parsedData = await data.json();
       console.log("PARSED DATA: ", parsedData)

       returnStructure.payload = parsedData
    } 
    catch (error) {
        console.error(error);
        returnStructure.error = true
    }
    finally {
        console.log("RETURNING STRUCTURE")
        return returnStructure
    }
};



export async function genericSubscribeToWebSocketChannel(path: string, ): Promise<wsActionsInterface> {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_ENDPOINT}/show_cards`);
    const wsActions: wsActionsInterface = {
        onOpen: ws.onopen = (event: any) => {
        console.log("Conexión WebSocket establecida.");
            ws.send(event);
        },

        onMessage: ws.onmessage = (event) => {
            console.log("Mensaje recibido del servidor:", event.data);
            return event.data
        },

        onClose: ws.onclose = (event) => {
            console.log("Conexión WebSocket cerrada.");
        },

        onError: ws.onerror = (error) => {
            console.error("Error en WebSocket:", error);
        },

        sendMessage: (event) => {
            ws.send(event)
        }
    };
    return wsActions
    }