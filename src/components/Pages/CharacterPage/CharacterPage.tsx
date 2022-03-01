import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter, getRandomQuoteByAuthor } from '../../../services/breaking-bad';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { redirect } from '../../../utils/utils';
import { initializeCharacterPage, loadCharacter, loadQuote } from './CharacterPage.slice';

export interface Params {
  id: string;
}

export function CharacterPage() {
  const { id } = useParams<keyof Params>() as Params;

  const {
    characterPage: { character, quote },
  } = useStore(({ characterPage }) => ({
    characterPage,
  }));

  useEffect(() => {
    onLoad(id);
  }, [id]);

  return (
    <Fragment>
      {character.match({
        none: () => <div>Loading character...</div>,
        some: (character) => <div>{character.name}</div>,
      })}
      {quote.match({
        none: () => <div>Loading quote...</div>,
        some: (quote) => <div>{quote.quote}</div>,
      })}
    </Fragment>
  );
}

async function onLoad(id: string) {
  store.dispatch(initializeCharacterPage());

  try {
    const character = await getCharacter(id);
    store.dispatch(loadCharacter(character));

    getNewRandomQuote(character.name);
  } catch (err) {
    redirect('');
  }
}

async function getNewRandomQuote(author: string) {
  const quote = await getRandomQuoteByAuthor(author);
  store.dispatch(loadQuote(quote));
}
