import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter, getRandomQuoteByAuthor } from '../../../services/breaking-bad';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { Character } from '../../../types/character';
import { redirect } from '../../../utils/utils';
import { initializeCharacterPage, loadCharacter, loadQuote, updateQuoteError } from './CharacterPage.slice';
import styles from './CharacterPage.module.css';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { Option } from '@hqoss/monads';
import { Quote } from '../../../types/quote';
import Fab from '@mui/material/Fab';
import CachedIcon from '@mui/icons-material/Cached';

export interface Params {
  id: string;
}

export function CharacterPage() {
  const { id } = useParams<keyof Params>() as Params;
  const { t } = useTranslation('main');

  const {
    characterPage: { character, quote, quoteError },
  } = useStore(({ characterPage }) => ({
    characterPage,
  }));

  useEffect(() => {
    onLoad(id);
  }, [id]);

  return (
    <Fragment>
      {character.match({
        none: () => <div>{t('character_page.loading_character')}</div>,
        some: (character) => <CharacterInfo character={character} />,
      })}
      <CharacterQuote quote={quote} quoteError={quoteError} character={character} />
    </Fragment>
  );
}

async function onLoad(id: string) {
  store.dispatch(initializeCharacterPage());

  try {
    const character = await getCharacter(id);
    store.dispatch(loadCharacter(character));

    await getNewRandomQuote(character.name);
  } catch (err) {
    redirect('');
  }
}

async function getNewRandomQuote(author: string) {
  const quote = await getRandomQuoteByAuthor(author);

  quote.match({
    err: (error) => {
      store.dispatch(updateQuoteError(error));
    },
    ok: (quote) => {
      store.dispatch(loadQuote(quote));
    },
  });
}

function CharacterInfo({ character }: { character: Character }) {
  const { t } = useTranslation('main');

  return (
    <div className={styles.container}>
      <img className={styles.characterImage} src={character.img} />
      <div className={styles.characterAttributes}>
        <Typography variant="h3" gutterBottom>
          {character.name}
        </Typography>
        <Attribute name={t('character_page.birthday')} value={character.birthday} />
        <ArrayAttribute name={t('character_page.occupation')} value={character.occupation} />
        <Attribute name={t('character_page.status')} value={character.status} />
        <Attribute name={t('character_page.nickname')} value={character.nickname} />
        <ArrayAttribute name={t('character_page.appearance')} value={character.appearance} />
        <Attribute name={t('character_page.portrayed')} value={character.portrayed} />
        <Attribute name={t('character_page.category')} value={character.category} />
        <ArrayAttribute
          name={t('character_page.better_call_saul_appearance')}
          value={character.better_call_saul_appearance}
        />
      </div>
    </div>
  );
}

function ArrayAttribute({ name, value }: { name: string; value: Array<string | number> }) {
  return <Attribute name={name} value={value.join(' | ')} />;
}

function Attribute({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.attribute}>
      <Typography variant="body1">
        <strong>{name}</strong>
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </div>
  );
}

function CharacterQuote({
  quote,
  quoteError,
  character,
}: {
  quote: Option<Quote>;
  quoteError: string;
  character: Option<Character>;
}) {
  const { t } = useTranslation('main');

  function reload() {
    character.match({
      none: () => {},
      some: (character) => {
        getNewRandomQuote(character.name);
      },
    });
  }

  return (
    <div className={styles.quoteContanier}>
      {quoteError && <Typography variant="body1">{t(quoteError)}</Typography>}
      {!quoteError &&
        quote.match({
          none: () => <Typography variant="body1">{t('character_page.loading_quote')}</Typography>,
          some: (quote) => (
            <div className={styles.existingQuoteContainer}>
              <Typography variant="h6" ml={10} mr={10} mb={2}>
                "{quote.quote}"
              </Typography>
              <Fab data-testid="reload-button" onClick={reload}>
                <CachedIcon />
              </Fab>
            </div>
          ),
        })}
    </div>
  );
}
