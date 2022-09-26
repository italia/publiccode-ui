import React, { ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";

import { Icon } from "../components/Icon/Icon";
import { DEBOUNCE_SEARCH_MS } from "../utils/constants";

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ defaultValue = "", placeholder = "", onChange }) => {
    const { register } = useForm({
      defaultValues: {
        search: defaultValue,
      },
    });

    const handleOnChangeSearchValue = debounce(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      DEBOUNCE_SEARCH_MS
    );

    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <Icon color="primary" icon="it-search" />
            </div>
          </div>
          <input
            className="form-control"
            data-testid="search-bar"
            id="search-bar"
            autoFocus={true}
            placeholder={placeholder}
            type="text"
            onChange={handleOnChangeSearchValue}
          />
        </div>
        <span className="autocomplete-icon" aria-hidden="true">
          <Icon color="primary" icon="it-close" />
        </span>
      </div>
    );
  }
);

interface SearchBarProps {
  defaultValue?: string;
  onChange: (a: string) => void;
  placeholder?: string;
}

SearchBar.displayName = "SearchBar";
