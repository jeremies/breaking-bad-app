import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App/App';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import main_es from './translations/es/main.json';
import main_en from './translations/en/main.json';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en',
  resources: {
    en: {
      main: main_en,
    },
    es: {
      main: main_es,
    },
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);
