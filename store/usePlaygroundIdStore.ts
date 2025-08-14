import {create} from 'zustand';


interface playgroundId {
    id: number,
    setId: (newId: number) => void
};

export const usePlaygroundStore = create<playgroundId>((set) => ({
    id: -1,
    setId: (newId) => set({id: newId})

}))
