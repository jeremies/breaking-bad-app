import { CharacterItem } from '../CharacterItem/CharacterItem';

export function CharacterGrid() {
  const characters = [1, 2, 3, 4];
  return (
    <div>
      {characters.map(() => (
        <CharacterItem />
      ))}
    </div>
  );
}
