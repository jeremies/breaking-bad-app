import { useStore } from '../../state/storeHooks';
import { CharacterItem } from '../CharacterItem/CharacterItem';

export function CharacterGrid() {
  const { characters } = useStore(({ characterGrid }) => characterGrid);

  return (
    <div>
      {characters.map((character) => (
        <CharacterItem key={character.char_id} character={character} />
      ))}
    </div>
  );
}