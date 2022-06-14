import * as React from "react";
import { useTranslation } from 'react-i18next';

import '../i18n';

import { CatalogueItem } from "../components/Catalogue/CatalogueItem";
import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer";
import { SearchContainer } from "../components/Search/SearchContainer";
import { Container, Header, HeaderBrand, HeaderContent, HeaderRightZone, HeaderSearch, HeaderSocialsZone, Icon } from "design-react-kit";
import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header small theme="light" type="center">
        <HeaderContent>
          <HeaderBrand iconName="it-code-circle">
            <h2>publiccode-unamed-ui</h2>
            <h3>{t('tagline')}</h3>
          </HeaderBrand>
          <HeaderRightZone>
            <HeaderSocialsZone>
              <ul>
                <li>
                  <a aria-label="Github" href="https://github.com/italia/publiccode-unnamed-ui" target="_blank">
                    <Icon icon="it-github" />
                  </a>
                </li>
              </ul>
            </HeaderSocialsZone>
          </HeaderRightZone>
        </HeaderContent>
      </Header>
      <Container>
        <CatalogueContainer />
        {/* <CatalogueItem fallback="fallback" /> */}
      </Container>
    </>
  );
};

export default IndexPage;
