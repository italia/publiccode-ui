import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { SearchBar } from "../SearchBar";
import {
  searchContextDispatch,
  searchContextState,
  setSearchValue,
} from "../../contexts/searchContext";
import { HeaderSearch } from "../HeaderSearch";

const useStyles = createUseStyles({
  header: {
    fontSize: "3rem",
  },
  image: {
    minHeight: "25vw",
  },
});

export const CatalogueHeader = React.memo(() => {
  const classes = useStyles();
  const { searchValue } = useContext(searchContextState);
  const dispatch = useContext(searchContextDispatch);
  const { t } = useTranslation();

  const handleSearch = useCallback(
    (value) => dispatch(setSearchValue(value)),
    [dispatch]
  );

  return (
    <HeaderSearch>
      <div className="col-12">
        <SearchBar
          onChange={handleSearch}
          defaultValue={searchValue}
          placeholder={t("search_form_label")}
        />
      </div>
    </HeaderSearch>
  );
});

CatalogueHeader.displayName = "CatalogueHeader";
