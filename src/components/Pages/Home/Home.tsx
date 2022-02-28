import { CharacterGrid } from '../../CharacterGrid/CharacterGrid';
import { getCharacters } from '../../../services/breaking-bad';
import { useStoreWithInitializer } from '../../../state/storeHooks';
import { loadCharacters, startLoadingCharacters, updateError } from '../../CharacterGrid/CharacterGrid.slice';
import { store } from '../../../state/store';
import styles from './Home.module.css';

export function Home() {
  useStoreWithInitializer(() => {}, load);

  return (
    <div className={styles.container}>
      <div>home</div>
      <CharacterGrid />
    </div>
  );
}

async function load() {
  store.dispatch(startLoadingCharacters());

  const multipleCharacters = await getCharacters();

  multipleCharacters.match({
    err: (error) => {
      store.dispatch(updateError(error));
    },
    ok: (characters) => {
      store.dispatch(loadCharacters(characters));
    },
  });
}
