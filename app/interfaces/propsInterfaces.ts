import { Card } from "./gameDataFlowInterfaces"

export interface buttonWithWsProps {
    isButtonEnabled: boolean,
    setIsButtonEnabled: (b: boolean) => void,
    };
export interface ActionModalProps {
  buttonsArray: string[],
  setBet: (s:string) => void,
  onClose: () => void
};

export interface CardsOnTheDeskProps {
  ownCards: Array<Card>,
  opponentCards: Array<Card>,
}


export interface MessageLoggerProps {
  ownLastMessage: string,
  ownPoints: number,
  ownBetCallsAmount: number,

  opponentLastMessage: string,
  opponentPoints: number,
  opponentBetCallsAmount: number
}

export interface WinnerLooserModalProps{
  hasWon: boolean;
};

export interface EnvidoModalProps {
  hasWon: boolean,
  setEnvidoWinnerId: (n: number) => void,
  playersEnvido: number,
  oponentsEnvido: number
}