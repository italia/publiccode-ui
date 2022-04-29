import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'design-react-kit';
import { createUseStyles } from 'react-jss';
import { SearchTypeItem } from '../../utils/proptypes';

const useStyles = createUseStyles({
  category: {
    marginLeft: 'auto',
    opacity: '0.5',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
  },
  item: {
    composes: 'row no-gutters align-items-center',
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#656566',
  },
  icon: {
    margin: '8px',
    fill: '#656566',
    minWidth: '25px',
    minHeight: '25px',
  },
});

export const SearchItem: React.FC<SearchTypeItem> = ({ item }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <a className={classes.item} href={item.url} data-testid={item.id}>
      <Icon className={classes.icon} icon={item.icon}></Icon>
      <div className="col">{item.name}</div>
      <div className={classes.category}>{t(`software.${item.category}`)}</div>
    </a>
  );
};
