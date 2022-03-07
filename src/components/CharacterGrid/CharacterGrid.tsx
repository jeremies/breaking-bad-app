import { Skeleton } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../state/storeHooks';
import { CharacterItem } from '../CharacterItem/CharacterItem';
import styles from './CharacterGrid.module.css';

export function CharacterGrid() {
  const { characters, error } = useStore(({ characterGrid }) => characterGrid);
  const { t } = useTranslation('main');

  return (
    <Fragment>
      {error && <div>{t(error)}</div>}
      {!error && (
        <div className={styles.characterGrid}>
          {characters.match({
            none: () =>
              Array.from(Array(20).keys()).map((el) => <Skeleton key={el} variant="rectangular" height={300} />),
            some: (characters) =>
              characters.map((character) => <CharacterItem key={character.char_id} character={character} />),
          })}
        </div>
      )}
    </Fragment>
  );
}
