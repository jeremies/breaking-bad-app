import { Some, Option, None } from '@hqoss/monads';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/character';

export interface CharacterGridState {
  characters: Option<Character[]>;
  error: string;
}

const initialState: CharacterGridState = {
  characters: None,
  error: '',
};

const slice = createSlice({
  name: 'characterGrid',
  initialState,
  reducers: {
    startLoadingCharacters: () => initialState,
    loadCharacters: (state, { payload: characters }: PayloadAction<Character[]>) => {
      state.characters = Some(characters);
    },
    updateError: (state, { payload: error }: PayloadAction<string>) => {
      state.error = error;
    },
  },
});

export const { startLoadingCharacters, loadCharacters, updateError } = slice.actions;

export default slice.reducer;
