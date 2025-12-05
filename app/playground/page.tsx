'use client';
import { useIdStore } from '@/hooks/useIdStore';
import React from 'react'
 function PlayerPlayGround(){
  const {id} = useIdStore()
  console.log("USER ID: ", id)
  // console.log("pgid",searchParams?.pgid)
  // const {pgid: playgroundId} = searchParams
    // const promise = seePlaygroundStatus(Number(playgroundId))

  return (
    <div>
      Bienvenido al playground
      
    </div>
  )
}


export default PlayerPlayGround
