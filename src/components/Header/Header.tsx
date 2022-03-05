import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  return (
    <div className={styles.navbar}>
      <NavLink to="/" className={styles.home}>
        Home
      </NavLink>
      <LanguageSelector />
    </div>
  );
}

function LanguageSelector() {
  const [language, setLanguage] = useState('en');
  const [, i18n] = useTranslation('main');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
      setLanguage(newLanguage);
    }
  };

  return (
    <ToggleButtonGroup value={language} exclusive onChange={handleChange}>
      <ToggleButton value="en">
        <ReactCountryFlag className={styles.flag} svg countryCode="US" />
        English
      </ToggleButton>
      <ToggleButton value="es">
        <ReactCountryFlag className={styles.flag} svg countryCode="ES" />
        Español
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
