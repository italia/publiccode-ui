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
        <div className="container mb-5">
          <div className="d-flex align-items-center min-vh-100">
            <div className="w-100 pb-5">
              <div className="row my-auto">
                <div className="col-1">
                  <LogoHome />
                </div>
                <div className="col-2 my-auto">
                  <div className={labelClasses}>{data.site.siteMetadata.title}</div>
                </div>

                <div className="col-8 my-auto">
                  <SearchAutocomplete />
                </div>

                <div className="pt-4 text-uppercase fw-bold offset-3 col-8 text-end">
                  <Link to="/software">{t('search_show_all')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
