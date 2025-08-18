'use client'
import React, {useState, useEffect} from 'react'
import { AvailableComponentProps, wsActionsInterface } from '@/app/interfaces/playgroundInterfaces'
import { genericSubscribeToWebSocketChannel } from '@/utilities/fetchTo'


const obtainwsActions = async(setWsActions: Function) => {
  const wsActions = await genericSubscribeToWebSocketChannel('show_cards')
  setWsActions(wsActions)
}


export const AvailableComponent = ({hasGameStarted}: AvailableComponentProps ) => {
  const [wsActions, setWsActions] = useState<wsActionsInterface | null>(null);

  useEffect(() => {
    obtainwsActions(setWsActions)
  }, [])
  // const wsActions: wsActionsInterface = genericSubscribeToWebSocketChannel('show_cards')
  const event = JSON.stringify({
    frontEndSays: "show_cards"
  })
  return (<>
      <h1>Bueno vamo' a juga'</h1>
      <span>{hasGameStarted ? "Ya desarrollo con ia esta GUI para poder recibir datarola": "Esperando a que me conecte en otra pestaña "}</span>
      <h3>Probando websocket</h3>
      {wsActions && (<button onClick={() => wsActions.sendMessage(event)}>
        Mostrar cartas
      </button>) 
      }

      </>
  )
}
