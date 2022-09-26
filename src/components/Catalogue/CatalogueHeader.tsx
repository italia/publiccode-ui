import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../SearchBar";
import {
  searchContextDispatch,
  searchContextState,
  setSearchValue,
} from "../../contexts/searchContext";
import { HeaderSearch } from "../HeaderSearch";
import { CatalogueFiltersContainer } from "./CatalogueFiltersContainer";

export const CatalogueHeader = React.memo(() => {
  const { searchValue } = useContext(searchContextState);
  const dispatch = useContext(searchContextDispatch);
  const { t } = useTranslation();

  const handleSearch = useCallback(
    (value) => dispatch(setSearchValue(value)),
    [dispatch]
  );

  return (
    <>
      <HeaderSearch>
        <div className="col-12">
          <SearchBar
            onChange={handleSearch}
            defaultValue={searchValue}
            placeholder={t("search_form_label")}
          />
        </div>
      </HeaderSearch>
      <div className="container">
        {/* breadcrumb */}
        <div className="col-1"></div>
        <div className="pt-4 mx-auto col-10">
          <nav
            className="breadcrumb-container"
            aria-label="Percorso di navigazione"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Lorem ipsum</a>
                <span className="separator">/</span>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Lorem ipsum</a>
                <span className="separator">/</span>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {searchValue
                  ? `${t("software.searching")}: `
                  : t("software.search")}
                {searchValue}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row filters-container py-5">
        <div className="col-lg-1"></div>
        {/* <div className="col-lg-10"> */}
          <CatalogueFiltersContainer prefixName="desktop_view" />
        {/* </div> */}
        <div className="col-lg-1"></div>
      </div>
    </>
  );
});

CatalogueHeader.displayName = "CatalogueHeader";
