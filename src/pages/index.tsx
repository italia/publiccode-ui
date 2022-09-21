import * as React from "react";
import { useTranslation } from 'react-i18next';

import '../i18n';

import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container">
        <CatalogueContainer />
        {/* <CatalogueItem fallback="fallback" /> */}
      </div>
    </>
  );
};

export default IndexPage;
