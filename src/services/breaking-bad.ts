import { Err, Ok, Result } from '@hqoss/monads';
import axios from 'axios';
import settings from '../config/settings';
import { Character, characterDecoder, multipleCharactersDecoder } from '../types/character';
import { Quote, quoteDecoder } from '../types/quote';

axios.defaults.baseURL = settings.baseApiUrl;

export async function getCharacters(): Promise<Result<Character[], string>> {
  try {
    return Ok(multipleCharactersDecoder.verify((await axios.get('characters')).data));
  } catch (err) {
    return Err('character_grid.error_server');
  }
}

export async function getCharacter(id: string): Promise<Character> {
  const { data } = await axios.get(`characters/${id}`);
  return characterDecoder.verify(data[0]);
}

export async function getRandomQuoteByAuthor(author: string): Promise<Result<Quote, string>> {
  const params = new URLSearchParams();
  params.append('author', author);
  const { data } = await axios.get(`quote/random?${params}`);
  if (data.length === 0) {
    return Err('character_page.no_quotes');
  }
  return Ok(quoteDecoder.verify(data[0]));
}
