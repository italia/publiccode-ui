import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../SearchBar";
import {
  searchContextDispatch,
  searchContextState,
  setSearchValue,
} from "../../contexts/searchContext";
import { HeaderSearch } from "../HeaderSearch";

export const CatalogueHeader = React.memo(() => {
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
