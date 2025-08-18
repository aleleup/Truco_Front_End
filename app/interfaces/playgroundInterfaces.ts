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


export interface wsActionsInterface {
  onOpen: (e:any) => void,
  onMessage: (e:any) => void,
  onClose: (e:any) => void,
  onError: (e:any) => void,
  sendMessage: (e:any) => void,
  

}