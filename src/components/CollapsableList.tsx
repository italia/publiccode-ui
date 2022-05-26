import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from 'design-react-kit';

export const CollapsableList = (props: CollapsableListProps) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const toggleShowAll = () => {
    setShowAll(!showAll);
  }

  const shownItems = () => showAll ? props.items : props.items.slice(0, props.visibleCount);

  return (
    <>
      <ul className="">
        {shownItems().map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <Button outline color="primary" onClick={toggleShowAll}>
        {t(showAll ? 'show_less' :'show_more')} <span aria-hidden>{showAll ? '«' : '»'}</span>
      </Button>
    </>
  );
}

interface CollapsableListProps {
  items: Array<string>;
  visibleCount: number;
}

CollapsableList.displayName = "CollapsableList";
