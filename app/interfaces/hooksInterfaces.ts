import { gameEntrance } from "./gameEntranceInterfaces"

export interface useWebSockeInterface {
    connected: boolean,
    lastMessage: gameEntrance,
    send: (data: string) => void
}
export interface idStoreInterface {
    id: number,
    setNewId: Function
}

