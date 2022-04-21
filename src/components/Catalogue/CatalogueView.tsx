import React, { useContext } from 'react';
import { Button } from 'design-react-kit';
import { Error } from '../Error';
import { useSearchEngine } from '../../hooks/useSearchEngine';
import { searchContextState } from '../../contexts/searchContext';
import { l10NLabels } from '../../utils/l10n';
import { CatalogueItems } from './CatalogueItems';
import { CatalogueSummary } from './CatalogueSummary';

export const CatalogueView = React.memo(() => {
  const { filterCategories, filterDevelopmentStatuses, filterIntendedAudiences, type } = useContext(searchContextState);
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
            {l10NLabels.software.load_more}
          </Button>
        </div>
      )}
    </>
  );
});

CatalogueView.displayName = 'CatalogueView';
