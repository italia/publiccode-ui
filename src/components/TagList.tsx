import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import { Chip, ChipLabel, Button } from 'design-react-kit';

export const TagList = (props: TagListProps) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const useStyles = createUseStyles({
    link: {
      textDecoration: 'unset',
      color: 'unset',
      "&:hover": {
        textDecoration: 'unset',
        color: 'unset',
      },
    },
  });
  const classes = useStyles();

  const toggleShowAll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setShowAll(!showAll);
  }

  const shownTags = () => showAll ? props.tags : props.tags.slice(0, props.visibleCount);

  return (
    <>
      {shownTags().map((tag, i) => (
        <Chip key={i}>
          <ChipLabel>
            <a className={classes.link} href="#" onClick={(e) => e.preventDefault()}>{tag}</a>
          </ChipLabel>
        </Chip>
      ))}

      {props.visibleCount < props.tags.length && (
        <small>
          <a className="link-primary" href="#" onClick={toggleShowAll}>
            {t(showAll ? 'show_less' :'show_more')} <span aria-hidden>{showAll ? '«' : '»'}</span>
          </a>
        </small>
      )}
    </>
  );
}

interface TagListProps {
  tags: Array<string>;
  visibleCount: number;
}

TagList.displayName = "TagList";
