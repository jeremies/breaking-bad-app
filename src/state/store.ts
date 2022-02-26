import { Action, configureStore } from '@reduxjs/toolkit';
import characterGrid from '../components/CharacterGrid/CharacterGrid.slice';

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { characterGrid },
  devTools: {
    name: 'BreakingBad',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewareConfiguration),
});
export type State = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
