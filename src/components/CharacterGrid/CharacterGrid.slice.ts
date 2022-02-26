import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/character';

export interface CharacterGridState {
  characters: Character[];
}

const initialState: CharacterGridState = {
  characters: [],
};

const slice = createSlice({
  name: 'characterGrid',
  initialState,
  reducers: {
    startLoadingCharacters: () => initialState,
    loadCharacters: (state, { payload }: PayloadAction<Character[]>) => {
      state.characters = payload;
    },
  },
});

export const { startLoadingCharacters, loadCharacters } = slice.actions;

export default slice.reducer;
