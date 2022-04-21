import React from "react";
import { createUseStyles } from "react-jss";
import { l10NLabels } from "../../utils/l10n";
import { SearchItem } from "./SearchItem";
import { SearchTypeItems } from "../../utils/proptypes";

const useStyles = createUseStyles({
  noResults: {
    color: "#656566",
  },
});

export const SearchItems: React.FC<SearchTypeItems> = React.memo(
  ({ items }) => {
    const classes = useStyles();
    if (items.length === 0) {
      return (
        <div className="form-group" data-testid="search-modal-no-results">
          <h5 className={classes.noResults}>
            {l10NLabels.software.no_results}
          </h5>
        </div>
      );
    }

    return (
      <div className="form-group" data-testid="search-modal-items">
        {items.map((i) => (
          <SearchItem key={i.id} item={i} />
        ))}
      </div>
    );
  }
);

SearchItems.displayName = "SearchItems";
