import { Link } from 'react-router-dom';
import { Character } from '../../types/character';
import styles from './CharacterItem.module.css';

export function CharacterItem({ character }: { character: Character }) {
  return (
    <div className={styles.characterItem}>
      <Link to={`/character/${character.char_id}`}>
        <img src={character.img} />
      </Link>
    </div>
  );
}
