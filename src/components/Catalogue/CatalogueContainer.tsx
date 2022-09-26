import React from 'react';
import { createUseStyles } from 'react-jss';
import { SearchProvider } from '../../contexts/searchContext';
import {
  initialCategories,
  initialDevelopmentStatuses,
  initialIntendedAudiences,
  initialPage,
  initialSearchValue,
  initialSortBy,
  initialType,
} from '../../utils/urlSearchParams';
import { ALL_CATALOGUE, RELEVANCE, RELEASE_DATE } from '../../utils/constants';
import { CatalogueView } from './CatalogueView';
import { CatalogueFiltersContainer } from './CatalogueFiltersContainer';
import { CatalogueHeader } from './CatalogueHeader';

const useStyle = createUseStyles({
  container: {
    composes: 'container',
    marginTop: '2.5rem',
    marginBottom: '6rem',
  },
});

export const CatalogueContainer = () => {
  const classes = useStyle();

  const defaultSortBy = initialSearchValue ? RELEVANCE : RELEASE_DATE;

  return (
    <SearchProvider
      initialCategories={initialCategories}
      initialDevelopmentStatuses={initialDevelopmentStatuses}
      initialPage={Number(initialPage)}
      initialIntendedAudiences={initialIntendedAudiences}
      initialSearchValue={initialSearchValue}
      initialSortBy={initialSortBy ?? defaultSortBy}
      initialType={initialType ?? ALL_CATALOGUE}
      syncStateWithQueryString={true}
    >
      <CatalogueHeader />
      <article className={classes.container} data-testid="catalogue-container">
        <div className="row">
          {/* <section className="col-lg-3 d-none d-lg-flex flex-column">
            <CatalogueFiltersContainer prefixName="desktop_view" />
          </section> */}
          <section className="col-1" />
          <section className="col-10">
            <CatalogueView />
          </section>
          <section className="col-1" />
        </div>
      </article>
    </SearchProvider>
  );
};
