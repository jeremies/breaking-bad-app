import { act, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getCharacter } from '../../../services/breaking-bad';

import { redirect } from '../../../utils/utils';
import { CharacterPage } from './CharacterPage';

jest.mock('../../../services/breaking-bad.ts');

const mockedGetCharacter = getCharacter as jest.Mock<ReturnType<typeof getCharacter>>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultCharacter = {
  char_id: 1,
  name: 'Test 1',
  birthday: 'Test 1',
  occupation: [],
  img: null,
  status: 'Test 1',
  nickname: 'Test 1',
  appearance: [],
  portrayed: 'Test 1',
  category: 'Test 1',
  better_call_saul_appearance: [],
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
});
