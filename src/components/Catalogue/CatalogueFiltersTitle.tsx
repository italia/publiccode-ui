import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import { Badge } from "../Badge/Badge";
import { Icon } from "../Icon/Icon";

const useStyles = createUseStyles({
  title: {
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "var(--white)",
    textTransform: "uppercase",
    fontWeight: "600",
    userSelect: "none",
  },
});

export const CatalogueFiltersTitle: React.FC<CatalogueFiltersTitleProps> =
  React.memo(
    ({ title, counter, showCollapsableIcon, onToogleExpandCollapse }) => {
      const classes = useStyles();
      const [expandIcon, setExpandIcon] = useState(true);

      const handleToogleShowAll = () => {
        setExpandIcon(!expandIcon);
        onToogleExpandCollapse();
      };

      return (
        <>
          <div
            className={classes.title}
            role="button"
            onClick={handleToogleShowAll}
            data-testid="catalogue-filters-title"
          >
            <div className="d-flex align-items-center">
              <span>{title}</span>
              {counter > 0 && (
                <Badge
                  className="ml-2"
                  tag="span"
                  pill
                  color="primary"
                  data-testid="counter"
                >
                  {counter}
                </Badge>
              )}
            </div>
            {showCollapsableIcon && (
              <Icon
                color="primary"
                icon={expandIcon ? "it-expand" : "it-collapse"}
                size="sm"
              />
            )}
          </div>
        </>
      );
    }
  );

interface CatalogueFiltersTitleProps {
  title: string;
  counter: number;
  showCollapsableIcon: boolean;
  onToogleExpandCollapse: () => void;
}

CatalogueFiltersTitle.displayName = "CatalogueFiltersTitle";
