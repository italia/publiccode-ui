import { useContext, useEffect, useReducer, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useFlexSearch } from "react-use-flexsearch";
import {
  searchContextDispatch,
  searchContextState,
  incrementPage,
} from "../contexts/searchContext";
import { PubliccodeLite } from "../utils/proptypes";
import {ALPHABETICAL, RELEASE_DATE, VITALITY} from "../utils/constants";

enum ActionType {
  ADD_ITEMS,
  SET_ITEMS,
  SET_IS_LOADING,
  SET_ERROR,
}
interface ActionAddItems {
  type: ActionType.ADD_ITEMS;
  value: {
    items: Store[];
  };
}

interface ActionSetItems {
  type: ActionType.SET_ITEMS;
  value: {
    items: Store[];
    total: number;
  };
}

interface ActionSetIsLoading {
  type: ActionType.SET_IS_LOADING;
}

interface ActionSetError {
  type: ActionType.SET_ERROR;
  value: {
    errorMessage: string;
  };
}

type Actions =
  | ActionAddItems
  | ActionSetItems
  | ActionSetIsLoading
  | ActionSetError;

interface State {
  isLoading: boolean;
  errorMessage?: string | null;
  items: Store[];
  total: number;
}
interface Store {
  id: string;
  publiccode: PubliccodeLite;
}

const initial: State = {
  isLoading: false,
  errorMessage: null,
  items: [],
  total: 0,
};

const reducer = (state: State, action: Actions) => {
  if (action.type === ActionType.ADD_ITEMS) {
    return {
      ...state,
      isLoading: false,
      items: [...state.items, ...action.value.items],
    };
  }

  if (action.type === ActionType.SET_ITEMS) {
    return {
      isLoading: false,
      items: action.value.items,
      total: action.value.total,
    };
  }

  if (action.type === ActionType.SET_IS_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === ActionType.SET_ERROR) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.value.errorMessage,
    };
  }
  return state;
};

const areMoreItemsAvailable = (from: number, size: number, total: number) =>
  from + size < total;

export const useSearchEngine = ({ pageSize } = { pageSize: 12 }) => {
  const [{ items, total, isLoading, errorMessage }, dispatch] = useReducer(
    reducer,
    initial
  );
  const dispatchGlobal = useContext(searchContextDispatch);
  const {
    filterCategories,
    filterDevelopmentStatuses,
    filterIntendedAudiences,
    page,
    type,
    searchValue,
    sortBy,
  } = useContext(searchContextState);
  
  // This feature is mainly used by the infiniteScroll to reload the previous items just after an user click on the browser back button
  const reloadItemsUntilPage = useRef(page > 0 ? page : null);
  // If we aren't in the "resume mode" the from is incremental
  const from = reloadItemsUntilPage.current ? 0 : page * pageSize;
  // If we aren't in the "resume mode" use the default page size
  const size = reloadItemsUntilPage.current
    ? (reloadItemsUntilPage.current + 1) * pageSize
    : pageSize;

  const {
    localSearchPages: { index, store },
    allSoftware: { edges },
  } = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
      allSoftware {
        edges {
          node {
            id
            publiccodeYml {
              logo
              name
              url
              description {
                en {
                  shortDescription
                  screenshots
                }
                it {
                  shortDescription
                  screenshots
                }
                fr {
                  shortDescription
                  screenshots
                }
                nl {
                  shortDescription
                }
              }
              legal {
                license
              }
              releaseDate
              categories
            }
          }
        }
      }
    }
  `);

  const fetchMore = () => {
    if (!isLoading && areMoreItemsAvailable(from, size, total)) {
      dispatchGlobal(incrementPage());
    }
  };

  const results: Store[] = useFlexSearch(searchValue, index, store)
  // TODO pagination

  // TODO filtering
  useEffect(() => {
    let filtered: Store[] = results;
    if (!searchValue) {
      filtered = edges.map(s => ({id: s.node.id, publiccode: {...s.node.publiccodeYml, license: s.node.publiccodeYml.legal.license}}))
    }

    filterCategories[0]
      ? (filtered =
          filterCategories
            .map((f) =>
              filtered.filter((k) => k.publiccode.categories.includes(f))
            )
            ?.at(0) || [])
      : filtered;
    filterIntendedAudiences[0]
      ? (filtered =
          filterIntendedAudiences
            .map((f) =>
              filtered.filter((k) =>
                k.publiccode.intendedAudience?.scope?.includes(f)
              )
            )
            ?.at(0) || [])
      : filtered;
    filterDevelopmentStatuses[0]
      ? (filtered =
          filterDevelopmentStatuses
            .map((f) =>
              filtered.filter((k) => k.publiccode.developmentStatus === f)
            )
            ?.at(0) || [])
      : filtered;

    switch (sortBy) {
      case ALPHABETICAL:
        filtered.sort((a, b) => a.publiccode.name.localeCompare(b.publiccode.name))
        break;
      case RELEASE_DATE:
        filtered.sort((a, b) => b.publiccode.releaseDate.localeCompare(a.publiccode.releaseDate))
        break;
      case VITALITY:
        break;
    }

    const set: ActionSetItems = {
      type: ActionType.SET_ITEMS,
      value: { items: filtered, total: filtered.length },
    };
    const add: ActionAddItems = {
      type: ActionType.ADD_ITEMS,
      value: { items: filtered },
    };

    dispatch(from === 0 ? set : add);
  }, [filterCategories, filterDevelopmentStatuses, filterIntendedAudiences, results, searchValue, sortBy]);

  return [errorMessage, items, total, fetchMore];
};
