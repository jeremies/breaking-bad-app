import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter, getRandomQuoteByAuthor } from '../../../services/breaking-bad';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { Character } from '../../../types/character';
import { redirect } from '../../../utils/utils';
import { initializeCharacterPage, loadCharacter, loadQuote } from './CharacterPage.slice';
import styles from './CharacterPage.module.css';

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
        some: (character) => <CharacterInfo character={character} />,
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

function CharacterInfo({ character }: { character: Character }) {
  return (
    <div className={styles.container}>
      <img className={styles.characterImage} src={character.img} />
      <div className={styles.characterAttributes}>
        <h1>{character.name}</h1>
        <Attribute name="Birthday" value={character.birthday} />
        <ArrayAttribute name="Occupation" value={character.occupation} />
        <Attribute name="Status" value={character.status} />
      </div>
    </div>
  );
}

function ArrayAttribute({ name, value }: { name: string; value: Array<string> }) {
  return (
    <div className={styles.attribute}>
      <strong>{name}</strong>
      <div>{value.join(' | ')}</div>
    </div>
  );
}

function Attribute({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.attribute}>
      <strong>{name}</strong>
      <div>{value}</div>
    </div>
  );
}
