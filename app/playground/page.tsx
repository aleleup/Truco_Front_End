import React from 'react'
import { genericPostTo, Payload } from '@/utilities/fetchTo'
import PlayGround from './components/Playground';
import { isAvailableInterface } from '../interfaces/playgroundInterfaces';

interface playgroundProps{
  searchParams: {
    pgid: string
  }
}
const seePlaygroundStatus = async(id:number): Promise<isAvailableInterface> => {
    const data:  Payload<isAvailableInterface> = await genericPostTo('check_playground_availability', {
      pageId: id
    });
    if (data.error) return {available: false, startingGame:false }
    const {available, startingGame} = data.payload;
    
    return {available, startingGame}
  };

 function PlayerPlayGround({searchParams}: playgroundProps){
  console.log("pgid",searchParams?.pgid)
  const {pgid: playgroundId} = searchParams
    const promise = seePlaygroundStatus(Number(playgroundId))

  return (
    <div>
      <PlayGround isAvailableAndHasGameStarted={promise} playgroundId={playgroundId}/>
    </div>
  )
}


export default PlayerPlayGround
