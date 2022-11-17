import React from "react";
import Helmet from "react-helmet";
import { createUseStyles } from 'react-jss';
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";

import '../components/Page/Page.scss';

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
  const classes = useStyles();
  const { t } = useTranslation();
  const labelClasses = classNames('fs-4', 'fw-bold', classes.label);

  return (
    <>
      <Helmet>
        <title>EU Public Code - Search</title>
      </Helmet>
      <Layout>
        <div className="container mb-5">
          <div className="d-flex align-items-center min-vh-100">
            <div className="w-100 pb-5">
              <div className="row my-auto">
                <div className="col-1">
                  <svg height="96" width="96">
                    <circle cx="50" cy="50" r="40" fill="#004080" />
                  </svg>
                </div>
                <div className="col-2 my-auto">
                  <div className={labelClasses}>EU Public Code</div>
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
