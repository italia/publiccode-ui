import React, { useEffect, useState } from "react";
import { useScrollIntoView } from "../../hooks/useScrollIntoView";
import { CatalogueItem } from "./CatalogueItem";
import { CatalogueNoResults } from "./CatalogueNoResults";
import { SearchTypeItems } from "../../utils/proptypes";
import CatalogueItemGrid from "./CatalogueItemGrid";

export const CatalogueItems: React.FC<SearchTypeItems> = React.memo(
  ({ items }) => {
    const [locationHash, setLocationHash] = useState("");
    useEffect(() => {
      setLocationHash(window.location.hash);
    }, []);

    useScrollIntoView({
      observableSelector: "[data-class='catalogue-item']",
      focusElementId: locationHash?.substring(1),
    });

    if (items.length === 0) {
      return <CatalogueNoResults />;
    }
    const isGridView = false;

    console.log("items", items);
    const itemsList = items.map((r, i) => (
      <React.Fragment key={i}>
        {isGridView ? (
          <div className="mx-auto col-sm-11 col-md-6 col-lg-4 col-xl-3 p-3 d-flex flex-column">
            <CatalogueItemGrid key={i} {...r} />
          </div>
        ) : (
          <div className="mx-auto col-sm-12 p-0 d-flex flex-column">
            <CatalogueItem key={i} {...r} />
          </div>
        )}
        <div className="dropdown-divider col-12 d-md-none"></div>
      </React.Fragment>
    ));
    return (
      <div className="mt-sm-3 mt-md-5 row" data-testid="catalogue-items">
        {itemsList}
      </div>
    );
  }
);

CatalogueItems.displayName = "CatalogueItems";
