import { gameDataFlow } from "./gameDataFlowInterfaces"

export interface useWebSockeInterface {
    connected: boolean,
    messages: gameDataFlow[],
    send: (data: gameDataFlow) => void,
    clearMessages: () => void,
    closeSocket: () => void,


}
export interface idStoreInterface {
    id: number,
    setNewId: (newId: number) => void;
}

