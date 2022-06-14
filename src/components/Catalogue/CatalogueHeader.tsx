import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { SearchBar } from '../SearchBar';
import { searchContextDispatch, searchContextState, setSearchValue } from '../../contexts/searchContext';

const useStyles = createUseStyles({
  header: {
    fontSize: '3rem',
  },
  image: {
    minHeight: '25vw',
  },
});

export const CatalogueHeader = React.memo(() => {
  const classes = useStyles();
  const { searchValue } = useContext(searchContextState);
  const dispatch = useContext(searchContextDispatch);
  const { t } = useTranslation();

  const handleSearch = useCallback((value) => dispatch(setSearchValue(value)), [dispatch]);

  return (
    <div className="text-center">
      <div className="row"></div>
      <div className="col-10 mx-auto text-center mb-3">
        <SearchBar onChange={handleSearch} defaultValue={searchValue} placeholder={t('search_form_label')} />
      </div>
    </div>
  );
});

CatalogueHeader.displayName = 'CatalogueHeader';
