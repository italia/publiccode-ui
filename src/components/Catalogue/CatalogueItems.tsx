import React, { useEffect, useState } from "react";
import { useScrollIntoView } from "../../hooks/useScrollIntoView";
import { CatalogueItem } from "./CatalogueItem";
import { CatalogueNoResults } from "./CatalogueNoResults";
import { SearchTypeItems } from "../../utils/proptypes";

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

    const itemsList = items.map((r) => (
      <React.Fragment key={r.id}>
        <div className="mx-auto col-sm-11 col-md-6 col-lg-4 col-xl-3 p-3 d-flex flex-column">
          <CatalogueItem key={r.id} {...r} />
        </div>
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
