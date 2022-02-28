import { Fragment } from 'react';
import { useStore } from '../../state/storeHooks';
import { CharacterItem } from '../CharacterItem/CharacterItem';
import styles from './CharacterGrid.module.css';

export function CharacterGrid() {
  const { characters, error } = useStore(({ characterGrid }) => characterGrid);

  return (
    <Fragment>
      {error && <div>{error}</div>}
      {!error &&
        characters.match({
          none: () => <div>Loading characters...</div>,
          some: (characters) => (
            <div className={styles.characterGrid}>
              {characters.map((character) => (
                <CharacterItem key={character.char_id} character={character} />
              ))}
            </div>
          ),
        })}
    </Fragment>
  );
}
