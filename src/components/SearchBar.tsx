import React, { ChangeEvent, SyntheticEvent, useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { Icon } from "../components/Icon/Icon";
import { DEBOUNCE_SEARCH_MS } from "../utils/constants";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";

const useStyles = createUseStyles({
  searchIconWrapper: {
    composes: "input-group-text",
    backgroundColor: "#004080 !important",
    borderBottom: "1px solid #ffffff !important",
    height: "2.5rem !important",
  },
  icons: {
    backgroundColor: "#004080",
  },
  input: {
    composes: "form-control text-white inputSearchBar",
    borderBottom: "1px solid #ffffff !important",
  },
});

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ defaultValue = "", placeholder = "", onChange }) => {
    const classes = useStyles();
    const { t } = useTranslation()
    const [value, setValue] = useState(defaultValue);

    const handleOnChangeSearchValue = useCallback(debounce(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      DEBOUNCE_SEARCH_MS
    ), [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      handleOnChangeSearchValue(e)
    }

    const handleClose = (e: SyntheticEvent) => {
      e.preventDefault();
      onChange("");
      setValue("")
    }

    return (
      <>
        <label className="text-white fs-6 fw-semibold text-uppercase">
          {t("software.search")}
        </label>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className={classes.searchIconWrapper}>
                <Icon
                  className={classes.icons}
                  color="white"
                  icon="it-search"
                />
              </div>
            </div>
            <input
              className={classes.input}
              data-testid="search-bar"
              id="search-bar"
              autoFocus={true}
              type="text"
              defaultValue={defaultValue}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
            />
            <div className="input-group-append">
              {value && (
                <div className={classes.searchIconWrapper}>
                  <a href="#" onClick={handleClose}>
                    <Icon className={classes.icons} color="white" icon="it-close" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

interface SearchBarProps {
  defaultValue?: string;
  onChange: (a: string) => void;
  placeholder?: string;
}

SearchBar.displayName = "SearchBar";
