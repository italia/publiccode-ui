import React, { ChangeEvent, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { SearchResult } from "../types/search-result";

import { Button } from "../components/Button/Button";
import { Icon } from "../components/Icon/Icon";
import { Chip } from '../components/Chips/Chip';
import { ChipLabel } from '../components/Chips/ChipLabel';

import { DEBOUNCE_SEARCH_MS } from "../utils/constants";
import {Link} from "gatsby";

export const SearchBar: React.FC<SearchBarProps> =
  ({ defaultValue = "", placeholder = "", onChange, searchResults = [] }) => {
    const [resultsState, setResults] = useState(searchResults)

    useEffect(() => {
      setResults([...searchResults]);
    }, [searchResults]);

    const useStyle = createUseStyles({
      searchBar: {
        width: "80% !important",
      },
    });
    const classes = useStyle();
    const resultClasses = classNames('autocomplete-list', { 'autocomplete-list-show': resultsState.length > 0 })

    const handleOnChangeSearchValue = debounce((e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    }, DEBOUNCE_SEARCH_MS);

    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <Icon icon="it-search" size="sm" />
            </div>
          </div>
          <input
            className="form-control"
            autoFocus={true}
            placeholder={placeholder}
            type="text"
            onChange={handleOnChangeSearchValue}
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <Icon icon="it-close" />
            </div>
          </div>
       </div>

      <ul className={resultClasses}>
        {resultsState.map((result, idx) => (
          <li key={idx}>
            <Link to={result.name}>
              <Icon icon="it-file" />
              <span className="autocomplete-list-text fs-5 fw-bold">{result.name}</span>
              <Chip large className="chip-primary chip-disabled">
                <ChipLabel className="fs-7 fw-bold">Category</ChipLabel>
              </Chip>
            </Link>
          </li>
        ))}
      </ul>
     </div>
    );
  };

interface SearchBarProps {
  defaultValue?: string;
  onChange: (a: string) => void;
  searchResults?: Array<SearchResult>;
  placeholder?: string;
}

SearchBar.displayName = "SearchBar";
