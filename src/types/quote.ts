// eslint-disable-next-line
// @ts-ignore
import { Decoder, number, object, string } from 'decoders';

export interface Quote {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

export const quoteDecoder: Decoder<Quote> = object({
  quote_id: number,
  quote: string,
  author: string,
  series: string,
});
