import { idStoreInterface } from "@/app/interfaces/hooksInterfaces";
import {create} from "zustand";

export const useIdStore = create<idStoreInterface>(set => ({
    id: -1,
    setNewId: (newId: number) => set({id: newId}),
    session: -1,
    setNewSession: (newSesion: number) => set({session: newSesion}),
}))