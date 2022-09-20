import * as React from "react";
import { useTranslation } from 'react-i18next';

import '../i18n';

import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer";

import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

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
