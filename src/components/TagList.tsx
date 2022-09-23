import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import { Chip } from '../components/Chips/Chip';
import { ChipLabel } from '../components/Chips/ChipLabel';

export const TagList = ({tags, visibleCount, isShowMoreVisible = true}: TagListProps) => {
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

  const shownTags = () => showAll ? tags : tags.slice(0, visibleCount);

  return (
    <>
      {shownTags().map((tag, i) => (
        <Chip large className="chip-primary chip-disabled" key={i}>
          <ChipLabel className="fs-7 fw-bold">{tag}</ChipLabel>
        </Chip>
      ))}

      {visibleCount < tags.length && isShowMoreVisible && (
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
  isShowMoreVisible?: boolean;
}

TagList.displayName = "TagList";
