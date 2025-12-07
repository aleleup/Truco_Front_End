export type gameDataFlow = PlayerStatus | PlayersAction | AuthorizationToPlay | IdAssignation | null

export interface PlayersAction {
    bet: Array<String>,
    card_index: number
}
interface AuthorizationToPlay {
    allow_access: boolean
}
interface IdAssignation {
    new_id: number
}
interface PlayerStatus{
    player_id: number, 
    points: number,
    cards: Array<Card>,
    options: PlayerOptions,
    envido: number,
    is_player_turn: boolean,

}

interface Card{
    name: string,
    value: number,
    type: string,
    envido_value: number
}

export interface PlayerOptions{
    Respuesta?: Record<number, string>,
    Truco: string,
    Envido?: Record<number, string>
}