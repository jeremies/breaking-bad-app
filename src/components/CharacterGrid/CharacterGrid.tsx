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
      {!error &&
        characters.match({
          none: () => <div>{t('character_grid.loading_characters')}</div>,
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
