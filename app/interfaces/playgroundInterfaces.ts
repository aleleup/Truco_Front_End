export interface isAvailableInterface{
  available: Boolean,
  startingGame:Boolean
}


export interface PlayGroundProps{
  isAvailableAndHasGameStarted: Promise<isAvailableInterface>,
  playgroundId: String
}


export interface playgroundId {
    id: number,
    setId: (newId: number) => void
};


export interface AvailableComponentProps{
  hasGameStarted: Boolean
}