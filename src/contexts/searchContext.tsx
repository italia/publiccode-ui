import React, { Dispatch, useReducer } from "react";
import { ALL_SITE, RELEVANCE } from "../utils/constants";
import { serializeStateToQueryString } from "../utils/urlSearchParams";
import { SearchProviderContext, StateToQueryString } from "../utils/proptypes";

export enum ActionType {
  INCREMENT_PAGE,
  SET_SEARCH_VALUE,
  SET_FILTERS_CATEGORIES,
  SET_FILTERS_INTENDED_AUDIENCES,
  SET_FILTERS_DEVELOPMENT_STATUSES,
  SET_SORT_BY,
  SET_TYPE,
}
export interface ActionIncrementPage {
  type: ActionType.INCREMENT_PAGE;
}
export interface ActionSetSearchValue {
  type: ActionType.SET_SEARCH_VALUE;
  value: string;
}
export interface ActionSetFiltersCategories {
  type: ActionType.SET_FILTERS_CATEGORIES;
  value: string[];
}
export interface ActionSetFiltersIntendedAudiences {
  type: ActionType.SET_FILTERS_INTENDED_AUDIENCES;
  value: string[];
}
export interface ActionSetFiltersDevelopmentStatuses {
  type: ActionType.SET_FILTERS_DEVELOPMENT_STATUSES;
  value: string[];
}
export interface ActionSetSortBy {
  type: ActionType.SET_SORT_BY;
  value: string;
}
export interface ActionSetType {
  type: ActionType.SET_TYPE;
  value: string;
}

export type Actions =
  | ActionIncrementPage
  | ActionSetSearchValue
  | ActionSetFiltersCategories
  | ActionSetFiltersIntendedAudiences
  | ActionSetFiltersDevelopmentStatuses
  | ActionSetSortBy
  | ActionSetType;

const defaultSearchValue = {
  filterCategories: [],
  filterDevelopmentStatuses: [],
  filterIntendedAudiences: [],
  page: 0,
  type: "",
  sortBy: "",
  searchValue: "",
};
export const searchContextState =
  React.createContext<StateToQueryString>(defaultSearchValue);
export const searchContextDispatch = React.createContext<Dispatch<Actions>>(
  () => {}
);

export const searchReducer = (state: StateToQueryString, action: Actions) => {
  switch (action.type) {
    case ActionType.INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case ActionType.SET_FILTERS_CATEGORIES:
      return {
        ...state,
        filterCategories: action.value,
        page: 0,
      };
    case ActionType.SET_FILTERS_DEVELOPMENT_STATUSES:
      return {
        ...state,
        filterDevelopmentStatuses: action.value,
        page: 0,
      };
    case ActionType.SET_FILTERS_INTENDED_AUDIENCES:
      return {
        ...state,
        filterIntendedAudiences: action.value,
        page: 0,
      };
    case ActionType.SET_TYPE:
      return {
        ...state,
        type: action.value,
        page: 0,
      };
    case ActionType.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.value,
        page: 0,
      };
    case ActionType.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.value,
        page: 0,
      };
    default:
      return state;
  }
};

export const SearchProvider: React.FC<SearchProviderContext> = ({
  initialCategories = [],
  initialDevelopmentStatuses = [],
  initialPage = 0,
  initialIntendedAudiences = [],
  initialSearchValue = "",
  initialSortBy = RELEVANCE,
  initialType = ALL_SITE,
  syncStateWithQueryString = false,
  children,
}) => {
  const initialArg: StateToQueryString = {
    filterCategories: initialCategories,
    filterDevelopmentStatuses: initialDevelopmentStatuses,
    filterIntendedAudiences: initialIntendedAudiences,
    page: initialPage,
    searchValue: initialSearchValue as string,
    sortBy: initialSortBy,
    type: initialType as string,
  };
  const [state, dispatch] = useReducer(searchReducer, initialArg);

  syncStateWithQueryString && serializeStateToQueryString(state);

  return (
    <searchContextState.Provider value={state}>
      <searchContextDispatch.Provider value={dispatch}>
        {children}
      </searchContextDispatch.Provider>
    </searchContextState.Provider>
  );
};

export const incrementPage = (): ActionIncrementPage => ({
  type: ActionType.INCREMENT_PAGE,
});

export const setFilterCategories = (
  categories: string[]
): ActionSetFiltersCategories => ({
  type: ActionType.SET_FILTERS_CATEGORIES,
  value: categories,
});
export const setFilterDevelopmentStatuses = (
  statuses: string[]
): ActionSetFiltersDevelopmentStatuses => ({
  type: ActionType.SET_FILTERS_DEVELOPMENT_STATUSES,
  value: statuses,
});
export const setFilterIntendedAudience = (
  intendedAudience: string[]
): ActionSetFiltersIntendedAudiences => ({
  type: ActionType.SET_FILTERS_INTENDED_AUDIENCES,
  value: intendedAudience,
});

export const setType = (type: string): ActionSetType => ({
  type: ActionType.SET_TYPE,
  value: type,
});

export const setSortBy = (sortBy: string): ActionSetSortBy => ({
  type: ActionType.SET_SORT_BY,
  value: sortBy,
});

export const setSearchValue = (value: string): ActionSetSearchValue => ({
  type: ActionType.SET_SEARCH_VALUE,
  value,
});
