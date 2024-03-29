import React, { Dispatch, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  Actions,
  searchContextDispatch,
  searchContextState,
  setFilterCategories,
  setFilterDevelopmentStatuses,
  setFilterIntendedAudience,
  setType,
} from "../../contexts/searchContext";
import {
  categories as softwareCategories,
  scopes as softwareScopes,
  developmentStatuses as softwareDevelopmentStatuses,
} from "../../types/publiccode";
import {
  ALL_CATALOGUE,
  SOFTWARE_OPEN,
  SOFTWARE_REUSE,
} from "../../utils/constants";
import { CatalogueFilters } from "./CatalogueFilters";

export const CatalogueFiltersContainer: React.FC<CatalogueFiltersContainerProps> =
  React.memo(({ prefixName }) => {
    const dispatch = useContext<Dispatch<Actions>>(searchContextDispatch);
    const {
      filterCategories,
      filterDevelopmentStatuses,
      filterIntendedAudiences,
      type,
    } = useContext(searchContextState);
    const { t } = useTranslation();

    const typesFilterName = `${prefixName}_type`;
    const categoriesFilterName = `${prefixName}_categories`;
    const intendedAudiencesFilterName = `${prefixName}_intended_audiences`;
    const developmentStatusesFilterName = `${prefixName}_development_statuses`;

    const softwareTypesFilter = [
      [ALL_CATALOGUE, t("all")],
      [SOFTWARE_OPEN, t("software.software_open")],
      [SOFTWARE_REUSE, t("software.software_reuse")],
    ];

    /* eslint-disable react-hooks/exhaustive-deps */
    const defaultTypes = useMemo(
      () => ({
        [typesFilterName]: type !== ALL_CATALOGUE ? type : ALL_CATALOGUE,
      }),
      []
    );
    const defaultCategories = useMemo(
      () => ({
        [categoriesFilterName]: filterCategories,
      }),
      []
    );
    const defaultDevelopmentStatuses = useMemo(
      () => ({
        [developmentStatusesFilterName]: filterDevelopmentStatuses,
      }),
      []
    );
    const defaultIntendedAudiences = useMemo(
      () => ({
        [intendedAudiencesFilterName]: filterIntendedAudiences,
      }),
      []
    );
    const handleChangeOnTypes = (value: string) => dispatch(setType(value));

    const handleChangeOnCategories = (values: string[]) =>
      dispatch(setFilterCategories(values));

    const handleChangeOnIntendedAudiences = (values: string[]) =>
      dispatch(setFilterIntendedAudience(values));

    const handleChangeOnDevelopmentStatuses = (values: string[]) =>
      dispatch(setFilterDevelopmentStatuses(values));

    return (
      <>
        <div className="col-xs-12 col-lg-1" />
        <div className="col-xs-12 col-lg-3">
          <CatalogueFilters
            title={t("software.categories")}
            emptySelect={t("software.empty_categories")}
            name={categoriesFilterName}
            filters={softwareCategories.map((category) => [
              category,
              t(`publiccode_yml.categories.${category}`),
            ])}
            defaultValues={defaultCategories}
            onChange={handleChangeOnCategories}
          />
        </div>
        <div className="col-xs-12 col-lg-3">
          <CatalogueFilters
            title={t("software.intended_audience")}
            emptySelect={t("software.empty_intended_audience")}
            name={intendedAudiencesFilterName}
            filters={softwareScopes.map((scope) => [
              scope,
              t(`publiccode_yml.scopes.${scope}`),
            ])}
            defaultValues={defaultIntendedAudiences}
            onChange={handleChangeOnIntendedAudiences}
          />
        </div>
        <div className="col-xs-12 col-lg-3">
          <CatalogueFilters
            title={t("software.development_status")}
            emptySelect={t("software.empty_development_status")}
            name={developmentStatusesFilterName}
            filters={softwareDevelopmentStatuses.map((status) => [
              status,
              t(`publiccode_yml.development_statuses.${status}`),
            ])}
            defaultValues={defaultDevelopmentStatuses}
            onChange={handleChangeOnDevelopmentStatuses}
          />
        </div>
        <div className="col-xs-12 col-lg-2" />
      </>
    );
  });

interface CatalogueFiltersContainerProps {
  prefixName: string;
}

CatalogueFiltersContainer.displayName = "CatalogueFiltersContainer";
