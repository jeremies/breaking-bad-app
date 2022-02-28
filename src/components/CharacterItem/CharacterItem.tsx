import { Character } from '../../types/character';
import styles from './CharacterItem.module.css';

export function CharacterItem({ character }: { character: Character }) {
  return (
    <div className={styles.characterItem}>
      <img src={character.img} />
    </div>
  );
}
