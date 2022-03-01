import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { None, Option, Some } from '@hqoss/monads';
import { Character } from '../../../types/character';

export interface CharacterPageState {
  character: Option<Character>;
}

const initialState: CharacterPageState = {
  character: None,
};

const slice = createSlice({
  name: 'characterPage',
  initialState,
  reducers: {
    initializeCharacterPage: () => initialState,
    loadCharacter: (state, { payload: character }: PayloadAction<Character>) => {
      state.character = Some(character);
    },
  },
});

export const { initializeCharacterPage, loadCharacter } = slice.actions;

export default slice.reducer;
