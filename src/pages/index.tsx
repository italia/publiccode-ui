import * as React from "react";

import {CatalogueItem} from "../components/Catalogue/CatalogueItem.js";
import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer.js";
import { SearchContainer } from "../components/Search/SearchContainer.js";

const IndexPage = () => {
  return (
    <>
      <SearchContainer />
      <CatalogueContainer />
      <CatalogueItem fallback="fallback" />
    </>
  );
};

export default IndexPage;
