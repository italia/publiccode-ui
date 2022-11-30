import React from "react";
import Helmet from "react-helmet";
import { createUseStyles } from 'react-jss';
import { useTranslation } from "react-i18next";
import { graphql, Link, useStaticQuery } from "gatsby";

import '../components/Page/Page.scss';
import LogoHome from '../../static/assets/inline/logo-home.svg';

import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';

import classNames from "classnames";
import { Layout } from "../components/Layout";
import { SearchAutocomplete } from '../components/SearchAutocomplete';

import '../i18n';

const useStyles = createUseStyles({
  label: {
    color: '#004080',
  },
});

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const classes = useStyles();
  const { t } = useTranslation();
  const labelClasses = classNames('fs-4', 'fw-bold', classes.label);

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title} - Search</title>
      </Helmet>
      <Layout>
        <div className="container mb-5" style={{marginTop: '20%'}}>
          <div className="d-flex flex-row align-items-center">
            <div>
              <LogoHome />
            </div>
            <div>
              <div className={labelClasses}>{data.site.siteMetadata.title}</div>
            </div>

            <div className="flex-grow-1">
              <SearchAutocomplete />
            </div>
          </div>

          <div className="d-flex justify-content-end flex-row">
            <div className="pt-4 text-uppercase fw-bold">
              <Link to="/software">{t('search_show_all')}</Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
