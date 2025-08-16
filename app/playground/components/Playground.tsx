'use client'
import { PlayGroundProps } from '@/app/interfaces/playgroundInterfaces';
import { genericPostTo } from '@/utilities/fetchTo';
import React, { useEffect, useState } from 'react'
import { AvailableComponent } from './Available';

function PlayGround({isAvailableAndHasGameStarted, playgroundId}: PlayGroundProps){
  const [isPlayegroundAvailable, setIsPlayegroundAvailable] = useState<Boolean>(false);
  const [hasGameStarted, setHasGameStarted] = useState<Boolean>(false);


  const getPLaygroundAvailability = async () => {
      const {available, startingGame} = await isAvailableAndHasGameStarted;
      setIsPlayegroundAvailable(available);
      setHasGameStarted(startingGame)
  };

  const handleAfterUnload = async(event: BeforeUnloadEvent) => {
    //Clear playgroundId from table
    await genericPostTo('delete-playground', {
    'pageId': playgroundId
  })
  };


  useEffect(() => {
    getPLaygroundAvailability();
    window.addEventListener('beforeunload', handleAfterUnload);
    // window.addEventListener('popstate', handleAfterUnload);
    return () => {
      window.removeEventListener('beforeunload', handleAfterUnload);
    };
  }, []);
  useEffect(() => {
    console.log("CHECK VARIABLES", isPlayegroundAvailable, hasGameStarted)
  },[isPlayegroundAvailable, hasGameStarted])

  
      if (isPlayegroundAvailable) return  (
       <AvailableComponent hasGameStarted={hasGameStarted}/>
      )
      else return (
        <div>Anda pa'ya bobo</div>
      )
  
}


export default PlayGround
