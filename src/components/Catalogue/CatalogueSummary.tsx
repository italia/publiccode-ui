import React, { useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { createUseStyles } from "react-jss";
import { CatalogueSort } from "./CatalogueSort";
import { searchContextState } from "../../contexts/searchContext";
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
    const { searchValue } = useContext(searchContextState);

    const handleExpandFilter = () => setExpandFilter(!expandFilter);

    return (
      <>
        <div className="row">
          <div className="row col-12 py-3 px-2 align-items-center">
            <div
              className="col-sm-12 col-md-8 col-lg-8 font-weight-bold text-left"
              data-testid="counter-summary"
            >
              {searchValue
                 ? t('software.results_text', {count: itemsCount})
                 : t('software.items_text', {count: itemsCount})
              }
            </div>

            <div className="col-xs-2 col-sm-2 col-md-1">
              <label className="text-uppercase">{t('software.sort_by')}</label>
            </div>

            <div className="col-xs-10 col-sm-10 col-md-3 col-lg-3">
              <CatalogueSort />
            </div>
          </div>
        </div>
        <div className="row">
          {/* filters */}

            {/* <div className="col-1 col-md-1 d-lg-none">
              <CatalogueFiltersTitle
                title={t('software.filters')}
                counter={totalAppliedFilters}
                showCollapsableIcon={false}
                onToogleExpandCollapse={handleExpandFilter}
              />
            </div> */}
          {/* <div className={classes.filters}>
            <div className="col-10 m-auto">
              <CatalogueFiltersContainer prefixName="mobile_view" />
            </div>
          </div> */}
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
