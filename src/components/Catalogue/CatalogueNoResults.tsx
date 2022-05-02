import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  image: {
    minHeight: '25vw',
  },
});

export const CatalogueNoResults = React.memo(() => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className="text-center mt-4" data-testid="catalogue-no-results">
      <img className={classes.image} src="/assets/images/serp_no_results.svg" />
      <h1>{t('software.no_results')}</h1>
      <p className="font-serif content-text">{t('software.retry_search')}</p>
    </div>
  );
});

CatalogueNoResults.displayName = 'CatalogueNoResults';
