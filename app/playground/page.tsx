import React from 'react'
import { genericPostTo, Payload } from '@/utilities/fetchTo'
import PlayGround from './components/Playground';

interface isAvailableInterface{
  available: Boolean
}

interface playgroundProps{
  searchParams: {
    pgid: string
  }
}
const seePlaygroundStatus = async(id:number): Promise<Boolean> => {
    const data:  Payload<isAvailableInterface> = await genericPostTo('check_page_availability', {
      pageId: id
    });
    if (data.error) return false
    const {available} = data.payload;
    return available
  };

 function PlayerPlayGround({searchParams}: playgroundProps){
  console.log("pgid",searchParams?.pgid)
  const {pgid: playgroundId} = searchParams
    const promise = seePlaygroundStatus(Number(playgroundId))

  return (
    <div>
      <PlayGround available={promise}/>
    </div>
  )
}


export default PlayerPlayGround
