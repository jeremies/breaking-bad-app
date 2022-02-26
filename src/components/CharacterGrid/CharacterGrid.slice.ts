import { Some, Option, None } from '@hqoss/monads';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/character';

export interface CharacterGridState {
  characters: Option<Character[]>;
}

const initialState: CharacterGridState = {
  characters: None,
};

const slice = createSlice({
  name: 'characterGrid',
  initialState,
  reducers: {
    startLoadingCharacters: () => initialState,
    loadCharacters: (state, { payload: characters }: PayloadAction<Character[]>) => {
      state.characters = Some(characters);
    },
  },
});

export const { startLoadingCharacters, loadCharacters } = slice.actions;

export default slice.reducer;
