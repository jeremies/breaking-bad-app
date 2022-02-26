import axios from 'axios';
import settings from '../config/settings';
import { Character, multipleCharactersDecoder } from '../types/character';

axios.defaults.baseURL = settings.baseApiUrl;

export async function getCharacters(): Promise<Character[]> {
  return multipleCharactersDecoder.verify((await axios.get('characters')).data);
}
