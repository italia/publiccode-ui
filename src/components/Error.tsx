import React from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from 'react-i18next';

const useStyle = createUseStyles({
  description: {
    opacity: "0.8",
  },
});

export const Error: React.FC<ErrorProps> = ({ description = null }) => {
  const classes = useStyle();
  const { t } = useTranslation();

  return (
    <div
      className="d-flex flex-column align-items-center h-100 justify-content-center"
      data-testid="error-something-went-wrong"
    >
      <img src="/assets/images/something_is_wrong.svg" alt={t('errors.something_went_wrong')} />
      <h3 className="mt-4">{t('errors.something_went_wrong')}</h3>
      {description && <div className={classes.description}>{description}</div>}
    </div>
  );
};

interface ErrorProps {
  description?: string;
}
