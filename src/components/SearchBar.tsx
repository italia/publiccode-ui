import React, { ChangeEvent } from "react";
import { createUseStyles } from "react-jss";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";

import { Button } from "../components/Button/Button";
import { Icon } from "../components/Icon/Icon";
import { DEBOUNCE_SEARCH_MS } from "../utils/constants";

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ defaultValue = "", placeholder = "", onChange }) => {

    const useStyle = createUseStyles({
      searchBar: {
        width: "80% !important",
      },
    });
    const classes = useStyle();

    const { register } = useForm({
      defaultValues: {
        search: defaultValue,
      },
    });

    const handleOnChangeSearchValue = debounce((e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    }, DEBOUNCE_SEARCH_MS);

    return (
      <div className='form-group'>
        <div className='input-group'>
          <input
            className={classes.searchBar}
            data-testid="search-bar"
            autoFocus={true}
            placeholder={placeholder}
            type="text"
            onChange={handleOnChangeSearchValue}
          />

          <div className='input-group-append'>
            <Button color="primary" icon>
              <span className="rounded-icon">
                <Icon color="primary" icon="it-search" />
              </span>
            </Button>
          </div>
       </div>
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
