import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { CatalogueFiltersTitle } from "./CatalogueFiltersTitle";

const useStyles = createUseStyles({
  groupContainer: {
    composes: "mt-2",
    maxHeight: (showAll) => (showAll ? "100%" : "200px"),
    overflowY: "hidden",
    paddingLeft: "2px",
    transition: "max-height 0.5s",
  },
  checkbox: {
    flexShrink: 0,
    width: "24px",
    height: "24px",
    marginRight: "8px",
  },
  label: {
    display: "flex",
    marginBottom: "0px",
    paddingTop: "1px",
    paddingBottom: "8px",
    textTransform: "capitalize",
    userSelect: "none",
  },
});

const getCount = (filterValues: {}) => Object.values(filterValues).flat().length;
export const CatalogueFilters: React.FC<CatalogueFiltersProps> = React.memo(
  ({ title, filters, defaultValues = {}, onChange, radio = false, name }) => {
    const [selectedFiltersCount, setSelectedFiltersCount] = useState(
      getCount(defaultValues)
    );
    const [showAll, setShowAll] = useState(false);

    const classes = useStyles(showAll);
    const { register, getValues } = useForm({
      defaultValues,
    });

    const updateCounter = () => setSelectedFiltersCount(getCount(getValues()));

    const handleOnChangeFilter = () => {
      updateCounter();
      const values = getValues();
      onChange(values[name]);
      console.log(values);
      
    };

    const toogleShowAll = () => {
      setShowAll(!showAll);
    };

    return (
      <>
        <div className={classes.groupContainer}>
          <CatalogueFiltersTitle
            title={title}
            counter={selectedFiltersCount}
            showCollapsableIcon={filters.length > 10}
            onToogleExpandCollapse={toogleShowAll}
          />
          {filters.map(([key, value]) => (
            <label key={key} className={classes.label}>
              <input
                alt={value}
                role="button"
                className={classes.checkbox}
                type={radio ? "radio" : "checkbox"}
                value={key}
                {...register(name)}
                onChange={handleOnChangeFilter}
              />
              {value}
            </label>
          ))}
        </div>
      </>
    );
  }
);
interface CatalogueFiltersProps {
  defaultValues: {};
  filters: Array<string[]>;
  name: string;
  onChange: (a: string) => void;
  radio?: boolean;
  title: string;
}

CatalogueFilters.displayName = "CatalogueFilters";
