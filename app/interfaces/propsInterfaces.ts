export interface buttonWithWsProps {
    isButtonEnabled: boolean,
    setIsButtonEnabled: () => void
    };
export interface ActionModalProps {
  buttonsArray: string[],
  setBet: (s:string) => void,
  onClose: () => void
};