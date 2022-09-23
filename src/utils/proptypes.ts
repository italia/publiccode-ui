import { RELEVANCE } from "./constants";

export type SearchTypeItems = {
  items: SearchType[];
};

export type SearchTypeItem = {
  item: SearchType;
};

export interface PubliccodeLite {
  description: {
    [key: string]: {
      genericName: string;
      features: string[];
      longDescription: string;
      localisedName: string;
      shortDescription: string;
      screenshots: string[];
    }
  };
  name: string;
  slug: string;
  categories: string[];
  logo: string;
  releaseDate: string;
  license: string;
}
export interface SearchType {
  id: string;
  publiccode: PubliccodeLite;
}

export interface ImageWithPlaceholderProps {
  alt: string;
  img: string;
  placeholder: string;
}

export interface StateToQueryString {
  filterCategories: string[];
  filterDevelopmentStatuses: string[];
  filterIntendedAudiences: string[];
  page: number;
  type: string;
  searchValue: string;
  sortBy: string;
}

export type Filters = {
  categories?: string[];
  developmentStatuses?: string[];
  intendedAudiences?: string[];
};
export interface QueryProps {
  type?: string;
  searchValue: string;
  filters: Filters;
  sortBy: string;
  from: number;
  size: number;
}

type SearchProviderContextFilters = {
  initialCategories?: string[];
  initialDevelopmentStatuses?: string[];
  initialIntendedAudiences?: string[];
};

// not used since this parameter is retrieved from url and so it is unpredictable
enum initialSortBy {"relevance", "release_date", null}
enum initialType {"all_site", null}
export interface SearchProviderContext extends SearchProviderContextFilters {
  initialPage?: number;
  initialSearchValue?: string | null;
  initialSortBy?: string;
  initialType: string | null;
  syncStateWithQueryString?: boolean;
}
