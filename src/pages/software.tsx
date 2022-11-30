import * as React from "react";
import '../components/Page/Page.scss';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';

import '../i18n';

import { CatalogueContainer } from "../components/Catalogue/CatalogueContainer";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const SoftwareListPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title} - Software</title>
      </Helmet>

      <CatalogueContainer />
    </>
  );
};

export default SoftwareListPage;
