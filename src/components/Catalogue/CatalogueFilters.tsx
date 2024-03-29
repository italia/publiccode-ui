import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { CatalogueFiltersTitle } from "./CatalogueFiltersTitle";

type RuleNames = "groupContainer" | "checkbox" | "label";
interface StyleProps {
  showAll: boolean;
}

type FormData = {
  [a: string]: string | string[];
};

const useStyles = createUseStyles<RuleNames, StyleProps>({
  groupContainer: {
    composes: "mt-2",
    maxHeight: ({ showAll }) => (showAll ? "100%" : "200px"),
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

const getCount = (filterValues: FormData) =>
  Object.values(filterValues).flat().length;

export const CatalogueFilters: React.FC<
  CatalogueFiltersArrayProps | CatalogueFiltersStringProps
> = React.memo(
  ({ title, emptySelect, filters, defaultValues = {}, onChange, radio = false, name }) => {
    const [selectedFiltersCount, setSelectedFiltersCount] = useState(
      getCount(defaultValues)
    );
    const [showAll, setShowAll] = useState(false);

    const classes = useStyles({ showAll });
    const { register, watch } = useForm<FormData>({
      defaultValues,
    });
    const watchFields = watch(name);

    React.useEffect(() => {
      updateCounter({ [name]: watchFields});
      console.log(name, watchFields);
      const field = watchFields === '' ? [] : watchFields;
      const result = Array.isArray(field) 
        ? 
        field : 
        [field]; // as an array because of not multiple select
      onChange(result);
    }, [watchFields]);

    const updateCounter = (data: FormData) =>
      setSelectedFiltersCount(getCount(data));

    // TODO avoiding react-hook-form that could be overkill
    // const [filter, setFilter] = useState<FormData>(defaultValues);
    // const handleOnChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    //   setFilter((s) => {
    //     let out: FormData = {};
    //     if (e.target.checked) {
    //       out = { [name]: [e.target.value, ...s[name]] };
    //     } else {
    //       const rest = s[name].filter((v) => v !== e.target.value);
    //       out = { [name]: rest };
    //     }
    //     onChange(out[name]);
    //     updateCounter(out);
    //     console.log(out, e.target.value);
    //     return out;
    //   });
    // };

    const toogleShowAll = () => {
      setShowAll(!showAll);
    };

    return (
      <form>
        <div className={classes.groupContainer}>
          <div className="fs-6 fw-semibold text-uppercase text-muted">
            {title}
          </div>

          <div className="select-wrapper">
            <select
              defaultValue={undefined}
              style={{
                textTransform: "capitalize",
                backgroundColor: "#F2F7FC",
              }}
              {...register(`${name}`)}
            >
              <option value={[]}>
                {emptySelect}
              </option>
              {filters.map(([key, value]) => (
                <option key={key} value={key} className={classes.label}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    );
  }
);
type CatalogueFiltersProps = {
  filters: Array<string[]>;
  name: string;
  title: string;
  emptySelect: string;
};
type CatalogueFiltersArrayProps = CatalogueFiltersProps & {
  radio?: false;
  defaultValues: { [a: string]: string[] };
  onChange: (a: string[]) => void;
};
type CatalogueFiltersStringProps = CatalogueFiltersProps & {
  radio: true;
  defaultValues: { [a: string]: string };
  onChange: (a: string) => void;
};

CatalogueFilters.displayName = "CatalogueFilters";
