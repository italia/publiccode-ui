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
import { Link } from "gatsby";

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
        <div className="row mt-3">
          <div className="col-1"></div>
          <div className="mx-auto col-10">
            <nav
              className="breadcrumb-container"
              aria-label="Percorso di navigazione"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                  <span className="separator">/</span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {t('software.search')}
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row mt-3 mb-5">
          {/* search terms */}
          <div className="col-1" />
          {searchValue && (
            <div className="col-10">
              <span className="fs-3">{t('software.search')}: </span>
              <span className="fw-bold fs-3">{searchValue}</span>
            </div>
          )}
          <div className="col-1" />
        </div>
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
