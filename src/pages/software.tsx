import * as React from "react";
import { useTranslation } from 'react-i18next';
import '../components/Page/Page.scss';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';

import '../i18n';

import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer";

const SoftwareListPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <CatalogueContainer />
    </>
  );
};

export default SoftwareListPage;
