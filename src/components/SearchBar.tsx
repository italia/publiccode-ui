import React, { ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";

import { Icon } from "../components/Icon/Icon";
import { DEBOUNCE_SEARCH_MS } from "../utils/constants";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";

const useStyles = createUseStyles({
  closeIconWrapper: {
    composes: "autocomplete-icon",
    backgroundColor: "#004080 !important",
  },
  searchIconWrapper: {
    composes: "input-group-text",
    backgroundColor: "#004080 !important",
    borderBottom: '1px solid #ffffff !important',
    height: '2.5rem !important',
  },
  icons: {
    backgroundColor: "#004080",
  },
  input: {
    composes: "form-control text-white inputSearchBar",
    borderBottom: '1px solid #ffffff !important',
  },
});

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ defaultValue = "", placeholder = "", onChange }) => {
    const classes = useStyles();
    const { t } = useTranslation();
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
      <>
        <label className="text-white fs-6 fw-semibold text-uppercase">{t('software.search')}</label>
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
              onChange={handleOnChangeSearchValue}
            />
          </div>
          <span className={classes.closeIconWrapper}>
            <Icon className={classes.icons} color="white" icon="it-close" />
          </span>
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
