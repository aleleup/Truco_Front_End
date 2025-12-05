export interface useWebSockeInterface {
    connected: boolean,
    lastMessage: gameEntrance,
    send: (data: string) => void
}
export type gameEntrance = PlayersAction | AuthorizationToPlay | IdAssignation | null
// export interface gameEntrance{
//     bet: Array<String>,
//     card_index: number,
//     allow_access: boolean,
//     new_id: number
// }
interface PlayersAction {
    bet: Array<String>,
    card_index: number
}

interface AuthorizationToPlay {
    allow_access: boolean
}
interface IdAssignation {
    new_id: number
}


export interface idStoreInterface {
    id: number,
    setNewId: Function
}