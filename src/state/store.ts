import { Action, configureStore } from '@reduxjs/toolkit';
import characterGrid from '../components/CharacterGrid/CharacterGrid.slice';
import characterPage from '../components/Pages/CharacterPage/CharacterPage.slice';

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { characterGrid, characterPage },
  devTools: {
    name: 'BreakingBad',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewareConfiguration),
});
export type State = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
