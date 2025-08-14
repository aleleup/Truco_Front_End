'use client'
import React, { useEffect, useState } from 'react'

interface PlayGroundProps{
  available: Promise<Boolean>
}
function PlayGround({available}: PlayGroundProps){
  const [isPlayegroundAvailable, setIsPlayegroundAvailable] = useState<Boolean>(false);
  const getPLaygroundAvailability = async () => {
      const availableAwaited = await available;
      setIsPlayegroundAvailable(availableAwaited);
  }
  useEffect(() => {
   getPLaygroundAvailability()
  }, [])

  return (
    <div>
      {isPlayegroundAvailable ? (
        <h1>Bueno vamo' a juga'</h1>
      ):
        <h1>Andá a lavarte las tetas este canal ya está ocupado o falló algo</h1>
}
    </div>
  )
}


export default PlayGround
