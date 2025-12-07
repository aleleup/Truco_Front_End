export interface buttonWithWsProps {
    isButtonEnabled: boolean,
    setIsButtonEnabled: (b: boolean) => void
    };
export interface ActionModalProps {
  buttonsArray: string[],
  setBet: (s:string) => void,
  onClose: () => void
};