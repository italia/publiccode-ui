import * as React from "react";
import { useTranslation } from 'react-i18next';
import '../components/Page/Page.scss';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';

import '../i18n';

import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer";
import {Helmet} from "react-helmet";

const SoftwareListPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>EU Public Code - Software</title>
      </Helmet>

      <CatalogueContainer />
    </>
  );
};

export default SoftwareListPage;
