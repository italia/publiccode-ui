import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { createUseStyles } from "react-jss";
import { CatalogueSort } from "./CatalogueSort";
import { CatalogueFiltersContainer } from "./CatalogueFiltersContainer";
import { CatalogueFiltersTitle } from "./CatalogueFiltersTitle";
import { CatalogueHeader } from "./CatalogueHeader";

type RuleNames = "filters";
interface StyleProps {
  expandFilter: boolean;
}

const useStyle = createUseStyles<RuleNames, StyleProps>({
  filters: {
    composes: "row col-12 mb-5 d-lg-none",
    display: (expandFilter) => (expandFilter ? "block" : "none"),
  },
});

export const CatalogueSummary: React.FC<CatalogueSummaryProps> = React.memo(
  ({ itemsCount, totalAppliedFilters }) => {
    const [expandFilter, setExpandFilter] = useState(false);
    const classes = useStyle({expandFilter});
    const { t } = useTranslation();

    const handleExpandFilter = () => setExpandFilter(!expandFilter);

    return (
      <>
        <CatalogueHeader />
        <div className="row">
          <div className="row col-12 py-3 px-2 align-items-center text-center">
            <div
              className="col-3 font-weight-bold text-left"
              data-testid="counter-summary"
            >{`${itemsCount} ${t('software.results')}`}</div>
            <div className="col-3 col-md-2 d-lg-none">
              <CatalogueFiltersTitle
                title={t('software.filters')}
                counter={totalAppliedFilters}
                showCollapsableIcon={false}
                onToogleExpandCollapse={handleExpandFilter}
              />
            </div>
            <div className="col-6 col-md-7 col-lg-9">
              <CatalogueSort />
            </div>
          </div>
          <div className={classes.filters}>
            <div className="col-10 m-auto">
              <CatalogueFiltersContainer prefixName="mobile_view" />
            </div>
          </div>
        </div>
      </>
    );
  }
);

interface CatalogueSummaryProps {
  itemsCount: number;
  totalAppliedFilters: number;
}

CatalogueSummary.displayName = "CatalogueSummary";
