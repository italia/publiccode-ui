import React from 'react';

import {
  initialCategories,
  initialDevelopmentStatuses,
  initialIntendedAudiences,
  initialPage,
  initialSearchValue,
  initialSortBy,
  initialType,
} from '../utils/urlSearchParams';
import { SearchProvider } from '../contexts/searchContext';
import { ALL_CATALOGUE, RELEVANCE } from '../utils/constants';

export function Layout({ children }) {
  return (
    <SearchProvider
      initialCategories={initialCategories}
      initialDevelopmentStatuses={initialDevelopmentStatuses}
      initialPage={Number(initialPage)}
      initialIntendedAudiences={initialIntendedAudiences}
      initialSearchValue={initialSearchValue}
      initialSortBy={RELEVANCE}
      initialType={initialType ?? ALL_CATALOGUE}
      syncStateWithQueryString={false}
    >
      {children}
    </SearchProvider>
  );
}
