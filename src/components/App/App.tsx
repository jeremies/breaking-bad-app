import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { CharacterPage } from '../Pages/CharacterPage/CharacterPage';

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
