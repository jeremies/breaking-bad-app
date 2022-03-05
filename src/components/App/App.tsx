import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { CharacterPage } from '../Pages/CharacterPage/CharacterPage';
import { Fragment } from 'react';
import { Header } from '../Header/Header';

export function App() {
  return (
    <HashRouter>
      <Fragment>
        <Header />
        <Routes>
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Fragment>
    </HashRouter>
  );
}
