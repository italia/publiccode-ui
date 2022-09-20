import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Error } from '../Error';
import { useSearchEngine } from '../../hooks/useSearchEngine';
import { searchContextState } from '../../contexts/searchContext';

import { Button } from '../Button/Button';
import { CatalogueItems } from './CatalogueItems';
import { CatalogueSummary } from './CatalogueSummary';

export const CatalogueView = React.memo(() => {
  const { filterCategories, filterDevelopmentStatuses, filterIntendedAudiences, type } = useContext(searchContextState);
  const { t } = useTranslation();

  let totalAppliedFilters = filterCategories.length + filterIntendedAudiences.length + filterDevelopmentStatuses.length;
  if (type) {
    totalAppliedFilters++;
  }

  // partialItems: they are partial because we use pagination.
  const [errorMessage, partialItems, itemsCount, fetchMore] = useSearchEngine();

  if (errorMessage) {
    return <Error description={errorMessage} />;
  }

  return (
    <>
      {itemsCount !== null && <CatalogueSummary itemsCount={itemsCount} totalAppliedFilters={totalAppliedFilters} />}
      <div className="mx-auto dropdown-divider"></div>
      {partialItems !== null && <CatalogueItems items={partialItems} />}
      {partialItems !== null && partialItems.length !== itemsCount && (
        <div className="d-flex w-100 justify-content-center mt-4">
          <Button color="primary" onClick={fetchMore}>
            {t('software.load_more')}
          </Button>
        </div>
      )}
    </>
  );
});

CatalogueView.displayName = 'CatalogueView';
