import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

import { ALL_SITE, SOFTWARE_REUSE, SOFTWARE_OPEN, PLATFORM, ADMINISTRATION, API } from '../../utils/constants';
import { searchContextDispatch, searchContextState, setType } from '../../contexts/searchContext';

const useStyles = createUseStyles({
  icon: {
    marginRight: '8px',
    minWidth: '32px',
    minHeight: '32px',
  },
  baseButton: {
    textTransform: 'capitalize',
    justifyContent: 'center',
    padding: '8px 24px',
    width: '100%',
  },
  buttonInactiveType: {
    composes: 'btn-default',
    extend: 'baseButton',
    background: 'var(--white)',
    border: '1px solid #656566',
    color: '#656566',
    '& span': {
      extend: 'icon',
    },
    '& svg': {
      extend: 'icon',
      fill: '#656566',
    },
  },
  buttonActiveType: {
    composes: 'btn-primary',
    extend: 'baseButton',
    '& span': {
      extend: 'icon',
      filter: 'invert(100%) brightness(200%)',
    },
    '& svg': {
      extend: 'icon',
      fill: 'var(--white)',
    },
  },
});

export const SearchType = React.memo(() => {
  const classes = useStyles();
  const { type } = useContext(searchContextState);
  const dispatch = useContext(searchContextDispatch);
  const { t } = useTranslation();

  const buttons = [
    {
      dataTestid: 'search-type-all',
      icon: 'it-search',
      label: t('all'),
      type: ALL_SITE,
    },
    {
      dataTestid: 'search-type-administration',
      icon: 'it-pa',
      label: t('software.administrations'),
      type: ADMINISTRATION,
    },
    {
      dataTestid: 'search-type-api',
      icon: 'it-settings',
      label: 'Api',
      type: API,
    },
    {
      dataTestid: 'search-type-platform',
      icon: 'it-piattaforme',
      label: t('software.platforms'),
      type: PLATFORM,
    },
    {
      dataTestid: 'search-type-software_open',
      icon: 'it-open-source',
      label: t('software.software_open'),
      type: SOFTWARE_OPEN,
    },
    {
      dataTestid: 'search-type-software_reuse',
      icon: 'it-software',
      label: t('software.software_reuse'),
      type: SOFTWARE_REUSE,
    },
  ];

  return (
    <div className="form-group" data-testid="search-type-buttons">
      {buttons.map((b) => (
        <div key={b.dataTestid} className="d-block d-md-inline-block m-1">
          <Button
            className={type === b.type ? classes.buttonActiveType : classes.buttonInactiveType}
            color="default"
            icon={true}
            tag="button"
            onClick={() => {
              dispatch(setType(b.type));
            }}
            data-testid={b.dataTestid}
          >
            <Icon icon={b.icon} /> {b.label}
          </Button>
        </div>
      ))}
    </div>
  );
});

SearchType.displayName = 'SearchType';
