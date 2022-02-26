import { Character } from '../../types/character';

export function CharacterItem({ character }: { character: Character }) {
  return <div>{character.name}</div>;
}
