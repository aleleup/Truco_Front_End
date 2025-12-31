'use client';

import { useIdStore } from '@/hooks/useIdStore';
import React, {useEffect, useState} from 'react';
import { PlayerOptions, PlayersAction, PublicPlayersData } from '../interfaces/gameDataFlowInterfaces';
import ActionModal from './components/ActionModal';
import { useWebSocket } from '@/hooks/useWebSocket';
import { MessageLogger } from './components/MessageLogger';
import { CardsOnTheDesk } from './components/CardsOnTheDesk';
import WinnerLooserModal from './components/WinnerLooserModal';
import DealingCardsModal from './components/DealingCardsModal';

function PlayGround() {
  const { id } = useIdStore();
  
  //PLAYERS Status STATES
  const [playersActionUrl, setPlayersActionUrl] = useState<string>('');
  const {
    messages: playersStatusMessages, 
    send: sendPlayersStatus, 
    clearMessages: clearStatusMessages,
    closeSocket: closePlayerStatusSocket
    
  } = useWebSocket(playersActionUrl)
  const [playersCards, setPlayersCards] = useState<Array<string>>([]);
  const [playerOptions, setPlayerOptions] = useState<PlayerOptions | null>(null);
  const [cardSelected, setCardSelected] = useState<number>(-1);
  const [optionSelected, setOptionSelected] = useState<keyof PlayerOptions | null>(null);
  const [betSelected, setBetSelected] = useState<string>("");
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [canThrowCards, setCanThrowCards] = useState<boolean>(true);
  const [hasQuiero, setHasQuiero] = useState<boolean>(true);
  //PUBLIC VIEW STATES
  const [publicViewUrl, setPublicViewUrl] = useState<string>('');
  const [winnerId, setWinnerId] = useState<number>(-1)
  const {
    messages: publicMessages, 
    clearMessages: clearPublicMessages,
    closeSocket: closePublicMessageSocket
} = useWebSocket(publicViewUrl)
  const [ownPublicData, setOwnPublicData] = useState<PublicPlayersData | null>(null)
  const [opponentPublicData, setOpponentPublicData] = useState<PublicPlayersData | null>(null)
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [roundWinner, setRoundWinner] = useState<number>(-1);
  //WEB-SOCKET playersStatusMessages MANAGEMENT:
  useEffect(() => {
    console.log("DEBBUG", playersStatusMessages)
    if (!playersStatusMessages.length) return;    
    const lastMessage = playersStatusMessages.at(-1)!;
    console.log("playersStatusMessages", lastMessage)

    if ('cards' in lastMessage){
      setPlayersCards(lastMessage.cards.map(card => card.name));
    };
    if ('options' in lastMessage){
      setPlayerOptions(lastMessage.options)
    }
    if ('is_player_turn' in lastMessage){
      setIsPlayerTurn(lastMessage.is_player_turn);
    }
    if ('can_throw_cards' in lastMessage){
      setCanThrowCards(lastMessage.can_throw_cards)
    }
    if ('has_quiero' in lastMessage){
      setHasQuiero(lastMessage.has_quiero)
    }
    
  },[playersStatusMessages]);
  
  // const inEnvido = ():boolean => {
  //   const envidoCalls = ["Envido", "Real Envido", "Falta Envido"]
  //   return (ownPublicData?.last_bet)
  // }
  

  //WEB-SOCKET publicMessages MANAGEMENT:
  useEffect(() => {
    if (!publicMessages.length) return;    
    const lastMessage = publicMessages.at(-1)!;

    if ('round' in lastMessage){
      if (lastMessage.round > currentRound){
        setCurrentRound(lastMessage.round);
        setOwnPublicData(null);
        setOpponentPublicData(null);
      }
    }

    if ('winner_id' in lastMessage){
      setWinnerId(lastMessage.winner_id);
    }
    if ('players_public_data' in lastMessage){
      console.log("setOwnPublicData, setOpponentPublicData")
      setOwnPublicData(lastMessage.players_public_data[id])
      setOpponentPublicData(lastMessage.players_public_data[(id + 1) % 2 ])
    }

    if ('round_winner' in lastMessage) {
      if (lastMessage.round_winner !== -1){
        clearPublicMessages();
        clearStatusMessages();
    }
      setRoundWinner(lastMessage.round_winner);
    };


  },[publicMessages]);

  useEffect(() => {
      if (id === -1) return;
      setPublicViewUrl(`${process.env.NEXT_PUBLIC_ENDPOINT}/public-view/${id}`)
      setPlayersActionUrl(`${process.env.NEXT_PUBLIC_ENDPOINT}/playground/${id}`)
  }, [id]);

  function typedKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  }

  function closeModal(): void {
    setOptionSelected(null);
    setOpenModal(false);
  }
  function setBetAndCloseModal(bet:string):void{
    setBetSelected(bet);
    setOpenModal(false);
  };

  function setMessageToServer(): PlayersAction{
    const bet: Array<string> = optionSelected && betSelected ? [optionSelected, betSelected] : [];
    return {
      bet,
      card_index: cardSelected
    }
  }

  // const optionSelectedIsAnArrayOfStrings = (): boolean => playerOptions != null && optionSelected != null && playerOptions[optionSelected]?.length && typeof playerOptions[optionSelected] === 'object'
    
  // SEND PLAYERS PLAY
  useEffect(() => {
    if (cardSelected !== -1){
      const messageToServer = setMessageToServer()
      console.log(messageToServer)
      send: sendPlayersStatus(messageToServer)
      setCardSelected(-1)
  }
  }, [cardSelected]);

  useEffect(() => {  
    if (optionSelected !== null && betSelected.length){
    const messageToServer = setMessageToServer()
    console.log(messageToServer)
    send: sendPlayersStatus(messageToServer);
    setBetSelected(''),
    setOptionSelected(null);
  }
 }, [betSelected]);


 useEffect(() => {
  if (winnerId != -1) {
    closePlayerStatusSocket();
    closePublicMessageSocket();
  }
 }, [winnerId])

  return (
    <main className="min-h-screen flex flex-col bg-[var(--color-primary)] text-white p-4">
      {/* MODAL */}

      {roundWinner !== -1 && (
        <DealingCardsModal/>
      )}
      {winnerId !== -1 && (
        <WinnerLooserModal hasWinned={winnerId === id}/>
      )}
      { playerOptions != null && optionSelected != null &&
      playerOptions[optionSelected]?.length && 
      typeof playerOptions[optionSelected] === 'object' && openModal && 
      <ActionModal onClose={closeModal } buttonsArray={playerOptions[optionSelected]} setBet={setBetAndCloseModal}/>}
      { !(ownPublicData === null || opponentPublicData === null) && (
        <>
        <MessageLogger 
          ownLastMessage={ownPublicData?.last_bet} 
          ownPoints={ownPublicData?.points}
          opponentLastMessage={opponentPublicData?.last_bet}
          opponentPoints={opponentPublicData?.points}
        
        />
       <CardsOnTheDesk ownCards={ownPublicData?.cards_on_desk} opponentCards={opponentPublicData?.cards_on_desk}/>
       </>
       )}
      {/* Zona inferior de botones */}
      <section className="w-full flex flex-col gap-4">

        {/* Cartas */}
        <div className="grid grid-cols-3 gap-4">
          {playersCards.length && playersCards.map((card, i) => (
              <button key={i} 
                onClick={() => setCardSelected(i)}
                disabled={!(isPlayerTurn && canThrowCards)} 
                className="disabled:bg-gray-400 bg-[var(--color-secondary)] py-4 rounded-xl text-xl font-bold shadow-md active:scale-95 transition"
                >
                {card}
              </button>
          ))}
        </div>

        {/* Envido / Truco / Responder */}
        <div className="grid grid-cols-3 gap-4">
          { playerOptions !== null && typedKeys(playerOptions).map((option, i)=> (
            <button 
              onClick={() => {
                setOpenModal(true)
                setOptionSelected(option)
              }
              }
              key={i}
              disabled={
                !isPlayerTurn || !!playerOptions &&  (!playerOptions[option]?.length ||
                (option === "Truco" && !hasQuiero)
                  )} 
              className={`disabled:bg-gray-400 ${option === "Mazo" ? "bg-red-600": "bg-blue-600"} py-5 rounded-xl text-xl font-extrabold shadow-lg active:scale-95 transition`}
              >
            {option}
          </button>
          )) }
        </div>
      </section>
    </main>
  );
}

export default PlayGround;
