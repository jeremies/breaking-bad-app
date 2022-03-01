import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { None, Option, Some } from '@hqoss/monads';
import { Character } from '../../../types/character';
import { Quote } from '../../../types/quote';

export interface CharacterPageState {
  character: Option<Character>;
  quote: Option<Quote>;
}

const initialState: CharacterPageState = {
  character: None,
  quote: None,
};

const slice = createSlice({
  name: 'characterPage',
  initialState,
  reducers: {
    initializeCharacterPage: () => initialState,
    loadCharacter: (state, { payload: character }: PayloadAction<Character>) => {
      state.character = Some(character);
    },
    loadQuote: (state, { payload: quote }: PayloadAction<Quote>) => {
      state.quote = Some(quote);
    },
  },
});

export const { initializeCharacterPage, loadCharacter, loadQuote } = slice.actions;

export default slice.reducer;
