import { Err, Ok, Result } from '@hqoss/monads';
import axios from 'axios';
import settings from '../config/settings';
import { Character, characterDecoder, multipleCharactersDecoder } from '../types/character';

axios.defaults.baseURL = settings.baseApiUrl;

export async function getCharacters(): Promise<Result<Character[], string>> {
  try {
    return Ok(multipleCharactersDecoder.verify((await axios.get('characters')).data));
  } catch (err) {
    // TODO translate and describe the error
    return Err('test error');
  }
}

export async function getCharacter(id: string): Promise<Character> {
  const { data } = await axios.get(`characters/${id}`);
  return characterDecoder.verify(data[0]);
}
