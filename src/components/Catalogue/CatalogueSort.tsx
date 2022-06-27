import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { initialSortBy } from '../../utils/urlSearchParams';
import { searchContextState, searchContextDispatch, setSortBy } from '../../contexts/searchContext';
import { RELEVANCE } from '../../utils/constants';

export const CatalogueSort = React.memo(() => {
  const { searchValue, sortBy } = useContext(searchContextState);
  const dispatch = useContext(searchContextDispatch);
  const { t } = useTranslation();

  const showRelevance = sortBy === RELEVANCE || searchValue;
  return (
    <div className="d-flex flex-wrap justify-content-end align-items-center">
      <label className="mb-0 pr-2">{t('software.sort_by')}</label>
      <select onChange={(e) => dispatch(setSortBy(e.target.value))} defaultValue={initialSortBy || undefined}>
        {showRelevance ? <option value="relevance">{t('software.sort_by_relevance')}</option> : null}
        <option value="release_date">{t('software.sort_by_release_date')}</option>
        <option value="vitality">{t('software.sort_by_vitality')}</option>
        <option value="name">{t('software.sort_by_alphabetic')}</option>
      </select>
    </div>
  );
});

CatalogueSort.displayName = 'CatalogueSort';
