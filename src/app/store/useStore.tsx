import { create } from "zustand";
import { Character } from "../types";

type InitialState = {
  firstCharacterSelected: Character | null;
  secondCharacterSelected: Character | null;
  setCharacterSelected: (character: Character, number: number) => void;
};

export const useStore = create<InitialState>((set) => ({
  firstCharacterSelected: null,
  secondCharacterSelected: null,
  setCharacterSelected: (character: Character, number: number) => {
    if (number === 1) {
      set({ firstCharacterSelected: character });
    } else if (number === 2) {
      set({ secondCharacterSelected: character });
    }
  },
}));
