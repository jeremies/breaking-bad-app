import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter } from '../../../services/breaking-bad';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { redirect } from '../../../utils/utils';
import { initializeCharacterPage, loadCharacter } from './CharacterPage.slice';

export interface Params {
  id: string;
}

export function CharacterPage() {
  const { id } = useParams<keyof Params>() as Params;

  const {
    characterPage: { character },
  } = useStore(({ characterPage }) => ({
    characterPage,
  }));

  useEffect(() => {
    onLoad(id);
  }, [id]);

  return character.match({
    none: () => <div>Loading character...</div>,
    some: (character) => <div>{character.name}</div>,
  });
}

async function onLoad(id: string) {
  store.dispatch(initializeCharacterPage());

  try {
    const character = await getCharacter(id);
    store.dispatch(loadCharacter(character));
  } catch (err) {
    redirect('');
  }
}
