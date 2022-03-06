import { Ok } from '@hqoss/monads';
// eslint-disable-next-line
// @ts-ignore
import { act, render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getCharacter, getRandomQuoteByAuthor } from '../../../services/breaking-bad';

import { redirect } from '../../../utils/utils';
import { CharacterPage } from './CharacterPage';

jest.mock('../../../services/breaking-bad.ts');

const mockedGetCharacter = getCharacter as jest.Mock<ReturnType<typeof getCharacter>>;
const mockedGetRandomQuoteByAuthor = getRandomQuoteByAuthor as jest.Mock<ReturnType<typeof getRandomQuoteByAuthor>>;

const defaultCharacter = {
  char_id: 1,
  name: 'Test 1',
  birthday: 'Test 1',
  occupation: [],
  img: 'Test 1',
  status: 'Test 1',
  nickname: 'Test 1',
  appearance: [],
  portrayed: 'Test 1',
  category: 'Test 1',
  better_call_saul_appearance: [],
};

const defaultQuote = {
  quote_id: 1,
  quote: 'Test 1',
  author: 'Test 1',
  series: 'Test 1',
};

async function renderWithPath(id: string) {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[`/${id}`]}>
        <Routes>
          <Route path="/:id" element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>
    );
  });
}

describe('In the character page', () => {
  it('Should redirect to home if it fails to load character', async () => {
    redirect('character/something');
    mockedGetCharacter.mockRejectedValueOnce({});
    await renderWithPath('124323');

    expect(location.hash === '#/').toBeTruthy();
  });

  it('Should render character', async () => {
    mockedGetCharacter.mockResolvedValueOnce({
      ...defaultCharacter,
      name: 'The Name',
      birthday: 'The Birthday',
      occupation: ['occupation1', 'occupation2'],
      status: 'The Status',
      nickname: 'The Nickname',
      appearance: [12345, 67890],
      portrayed: 'The Portrayed',
      category: 'The Category',
      better_call_saul_appearance: [9876, 5432],
    });
    await renderWithPath('123');

    expect(screen.getByText('The Name')).toBeInTheDocument();
    expect(screen.getByText('The Birthday')).toBeInTheDocument();
    expect(screen.getByText('occupation1 | occupation2')).toBeInTheDocument();
    expect(screen.getByText('The Status')).toBeInTheDocument();
    expect(screen.getByText('The Nickname')).toBeInTheDocument();
    expect(screen.getByText('12345 | 67890')).toBeInTheDocument();
    expect(screen.getByText('The Portrayed')).toBeInTheDocument();
    expect(screen.getByText('The Category')).toBeInTheDocument();
    expect(screen.getByText('9876 | 5432')).toBeInTheDocument();
  });

  it('Should render random quote on load', async () => {
    mockedGetCharacter.mockResolvedValueOnce(defaultCharacter);
    mockedGetRandomQuoteByAuthor.mockResolvedValueOnce(
      Ok({
        ...defaultQuote,
        quote: 'The Random Quote',
      })
    );
    await renderWithPath('1234');
    expect(screen.getByText('"The Random Quote"')).toBeInTheDocument();
  });

  it('Should render random quote on click reload', async () => {
    mockedGetCharacter.mockResolvedValueOnce(defaultCharacter);
    mockedGetRandomQuoteByAuthor.mockResolvedValueOnce(
      Ok({
        ...defaultQuote,
        quote: 'The Random Quote 1',
      })
    );
    await renderWithPath('1234');

    mockedGetRandomQuoteByAuthor.mockResolvedValueOnce(
      Ok({
        ...defaultQuote,
        quote: 'The Random Quote 2',
      })
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId('reload-button'));
    });
    expect(screen.queryByText('"The Random Quote 1"')).not.toBeInTheDocument();
    expect(screen.getByText('"The Random Quote 2"')).toBeInTheDocument();
  });
});
