// eslint-disable-next-line
// @ts-ignore
import { array, Decoder, number, object, string } from 'decoders';

export interface Character {
  char_id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  nickname: string;
  appearance: number[];
  portrayed: string;
  category: string;
  better_call_saul_appearance: number[];
}

export const characterDecoder: Decoder<Character> = object({
  char_id: number,
  name: string,
  birthday: string,
  occupation: array(string),
  img: string,
  status: string,
  nickname: string,
  appearance: array(number),
  portrayed: string,
  category: string,
  better_call_saul_appearance: array(number),
});

export const multipleCharactersDecoder: Decoder<Character[]> = array(characterDecoder);
