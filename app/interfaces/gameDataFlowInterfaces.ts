export type gameDataFlow = PlayerStatus | GeneralPublicData | PlayersAction | AuthorizationToPlay | IdAssignation | null

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
    can_throw_cards: boolean
}

export interface Card{
    name: string,
    value: number,
    type: string,
    envido_value: number,
    ascii_art: string
}

export interface PlayerOptions{
    Respuesta?: Array<string>,
    Truco: string,
    Envido: Array<string>
}

interface GeneralPublicData {
    game_over: boolean,
    players_public_data: Array<PublicPlayersData>
}

export interface PublicPlayersData {
    last_bet: string,
    cards_on_desk: Array<Card>,
    points: number
}