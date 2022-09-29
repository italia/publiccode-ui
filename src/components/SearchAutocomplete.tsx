import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";

import {
  initialCategories,
  initialDevelopmentStatuses,
  initialIntendedAudiences,
  initialPage,
  initialSearchValue,
  initialSortBy,
  initialType,
} from '../utils/urlSearchParams';
import { searchContextDispatch, searchContextState, SearchProvider, setSearchValue } from '../contexts/searchContext';
import { SearchTypeItems, SearchType } from '../utils/proptypes';
import { ALL_CATALOGUE, RELEVANCE, RELEASE_DATE } from '../utils/constants';

import { Icon } from "../components/Icon/Icon";
import { Chip } from '../components/Chips/Chip';
import { ChipLabel } from '../components/Chips/ChipLabel';

import { Link, navigate } from "gatsby";
import { useSearchEngine} from "../hooks/useSearchEngine";
import {ImageWithPlaceholder} from "./ImageWithPlaceholder";

export const SearchAutocomplete = React.memo(() => {
  const { searchValue } = useContext(searchContextState);
  const dispatch = useContext(searchContextDispatch);

  const [errorMessage, partialItems, itemsCount, fetchMore] = useSearchEngine();
  const items = partialItems as SearchType[];

  const handleSearch = useCallback((e) => {
    return dispatch(setSearchValue(e.target.value));
  }, [dispatch]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/software?search_value=${searchValue}`)
    }
  }

  const handleClose = useCallback((_) => {
    return dispatch(setSearchValue(''));
  }, [dispatch]
  );

  const useStyle = createUseStyles({
    searchBar: {
      width: '80% !important',
    },
    formFix: {
      top: '2px',
      // 2.5rem
    },
    logoContainer: {
      height: "64px",
      width: "64px",
      'padding-right': '1rem',
    },
  });
  const classes = useStyle();
  const resultClasses = classNames('autocomplete-list', { 'autocomplete-list-show': partialItems });
  const formClasses = classNames('form-control', classes.formFix);

  return (
    <div className="form-group my-auto">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <Icon icon="it-search" size="sm" />
          </div>
        </div>
        <input
          className={formClasses}
          autoFocus={true}
          placeholder="Open source software"
          defaultValue={searchValue}
          value={searchValue}
          type="text"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <div className="input-group-append">
        {searchValue && (
          <div className="input-group-text">
            <a href="#" onClick={handleClose}>
              <Icon icon="it-close" />
            </a>
          </div>
        )}
        </div>
     </div>

    {items.length > 0 && (
      <ul className={resultClasses}>
        {items && items.slice(0, 5).map((result, idx) => (
          <li key={idx}>
            <Link to={`/software/${result.id}`}>
                <div className={classes.logoContainer}>
                  <ImageWithPlaceholder alt="" img={result.publiccode.logo} />
                </div>
                <span className="autocomplete-list-text fs-5 fw-bold my-auto me-4">{result.publiccode.name}</span>

                <div className="my-auto d-flex flex-grow-3 justify-content-end">
                {result.publiccode.categories.length > 0 &&  (
                  <Chip className="chip-primary chip-disabled">
                    <ChipLabel className="fs-7 fw-bold">{result.publiccode.categories[0]}</ChipLabel>
                  </Chip>
                )}
                </div>
            </Link>
          </li>
        ))}
        <hr />
        <li className="text-uppercase fw-bold">
          <a href={`/software?search_value=${searchValue}`}>
            <div className="pe-2">Show more results for “{searchValue}”</div>
            <Icon size="sm" icon="it-search" />
          </a>
        </li>
      </ul>
    )}
   </div>
  );
});

SearchAutocomplete.displayName = "SearchAutocomplete";
