export type gameDataFlow = PlayerStatus | GeneralPublicData | PlayersAction | AuthorizationToPlay | IdAssignation | null

type CardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10 | 11 | 12
type CardType = "sword" | "wood" | "cup" | "gold"


export interface PlayersAction {
    bet: Array<string>,
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
    can_throw_cards: boolean,
    has_quiero: boolean
}

export interface Card{
    name: string,
    value: number,
    type: CardType,
    envido_value: number,
    number: CardNumber
}

export interface PlayerOptions{
    Mazo?: Array<string>,
    Truco: string,
    Envido: Array<string>
}

interface GeneralPublicData {
    winner_id: number,
    players_public_data: Array<PublicPlayersData>,
    round: number,
    round_winner: number
}

export interface PublicPlayersData {
    last_bet: string,
    cards_on_desk: Array<Card>,
    points: number
}



export type CardKey = `${CardNumber}&${CardType}`