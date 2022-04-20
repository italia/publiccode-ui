import * as React from "react";

import { CatalogueItem } from "../components/Catalogue/CatalogueItem.js";
import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer.js";
import { SearchContainer } from "../components/Search/SearchContainer.js";
import { Container, Header, HeaderBrand, HeaderContent, HeaderRightZone, HeaderSearch, HeaderSocialsZone, Icon } from "design-react-kit";
import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

const IndexPage = () => {
  return (
    <>
      <Header small theme="light" type="center">
        <HeaderContent>
          <HeaderBrand iconName="it-code-circle">
            <h2>Lorem Ipsum Lorem Ipsum</h2>
            <h3>Inserire qui la tag line</h3>
          </HeaderBrand>
          <HeaderRightZone>
            <HeaderSocialsZone label="Seguici su">
              <ul>
                <li>
                  <a aria-label="Github" href="#" target="_blank">
                    <Icon icon="it-github" />
                  </a>
                </li>
              </ul>
            </HeaderSocialsZone>
            <SearchContainer />
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
