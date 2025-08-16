import { AvailableComponentProps } from '@/app/interfaces/playgroundInterfaces'
import React from 'react'

export const AvailableComponent = ({hasGameStarted}: AvailableComponentProps ) => {
  return (<>
      <h1>Bueno vamo' a juga'</h1>
      <span>{hasGameStarted ? "Ya desarrollo con ia esta GUI para poder recibir datarola": "Esperando a que me conecte en otra pestaña "}</span>
      </>
  )
}
