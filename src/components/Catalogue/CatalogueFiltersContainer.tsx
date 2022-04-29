import React, { useContext, useMemo } from "react";
import { useTranslation } from 'react-i18next';

import {
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
} from '../../types/publiccode';
import { ALL_CATALOGUE, SOFTWARE_OPEN, SOFTWARE_REUSE } from "../../utils/constants";
import { CatalogueFilters } from "./CatalogueFilters";

export const CatalogueFiltersContainer: React.FC<CatalogueFiltersContainerProps> =
  React.memo(({ prefixName }) => {
    const dispatch = useContext(searchContextDispatch);
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
      [ALL_CATALOGUE, t('all')],
      [SOFTWARE_OPEN, t('software.software_open')],
      [SOFTWARE_REUSE, t('software.software_reuse')],
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
    /* eslint-enable react-hooks/exhaustive-deps */

    const handleChangeOnTypes = (value) => dispatch(setType(value));

    const handleChangeOnCategories = (values) =>
      dispatch(setFilterCategories(values));

    const handleChangeOnIntendedAudiences = (values) =>
      dispatch(setFilterIntendedAudience(values));

    const handleChangeOnDevelopmentStatuses = (values) =>
      dispatch(setFilterDevelopmentStatuses(values));

    return (
      <>
        <CatalogueFilters
          title={t('software.type')}
          name={typesFilterName}
          filters={softwareTypesFilter}
          defaultValues={defaultTypes}
          onChange={handleChangeOnTypes}
          radio={true}
        />
        <CatalogueFilters
          title={t('software.categories')}
          name={categoriesFilterName}
          filters={softwareCategories.map((category) => [category, t(`publiccode_yml.categories.${category}`)])}
          defaultValues={defaultCategories}
          onChange={handleChangeOnCategories}
        />
        <CatalogueFilters
          title={t('software.intended_audience')}
          name={intendedAudiencesFilterName}
          filters={softwareScopes.map((scope) => [scope, t(`publiccode_yml.scopes.${scope}`)])}
          defaultValues={defaultIntendedAudiences}
          onChange={handleChangeOnIntendedAudiences}
        />
        <CatalogueFilters
          title={t('software.development_status')}
          name={developmentStatusesFilterName}
          filters={softwareDevelopmentStatuses.map((status) => [
            status,
            t(`publiccode_yml.development_statuses.${status}`),
          ])}
          defaultValues={defaultDevelopmentStatuses}
          onChange={handleChangeOnDevelopmentStatuses}
        />
      </>
    );
  });

interface CatalogueFiltersContainerProps {
  prefixName: string;
}

CatalogueFiltersContainer.displayName = "CatalogueFiltersContainer";
