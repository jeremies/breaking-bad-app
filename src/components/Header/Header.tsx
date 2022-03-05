import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';

export function Header() {
  const handleClickBack = () => {
    window.location.hash = '';
  };
  const location = useLocation();
  const [t] = useTranslation('main');

  return (
    <AppBar position="static" style={{ background: '#d3d3d3' }}>
      <Toolbar>
        {location.pathname.includes('character') ? (
          <IconButton size="large" edge="start" sx={{ mr: 2 }} onClick={handleClickBack}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <div className={styles.blank}></div>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: 'black' }}>
          {t('header.app_title')}
        </Typography>
        <LanguageSelector />
      </Toolbar>
    </AppBar>
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
    <ToggleButtonGroup size="small" value={language} exclusive onChange={handleChange}>
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
