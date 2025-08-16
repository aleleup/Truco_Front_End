import { playgroundId } from '@/app/interfaces/playgroundInterfaces';
import {create} from 'zustand';


export const usePlaygroundStore = create<playgroundId>((set) => ({
    id: -1,
    setId: (newId) => set({id: newId})

}))
