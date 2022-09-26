import * as React from "react";
import { useTranslation } from 'react-i18next';

import '../i18n';

import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer";
import { Page } from "../components/Page/Page";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <div className="container">
        <CatalogueContainer />
        {/* <CatalogueItem fallback="fallback" /> */}
      </div>
    </Page>
  );
};

export default IndexPage;
