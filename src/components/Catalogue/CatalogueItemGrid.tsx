import React from "react";
import { createUseStyles } from "react-jss";
import { ImageWithPlaceholder } from "../ImageWithPlaceholder";
import { SearchType } from "../../utils/proptypes";
import { useTranslation } from "react-i18next";

import { Icon } from "../Icon/Icon";
import { TagList } from "../TagList";
import { getSoftwareCategory, SOFTWARE_REUSE } from "../../utils/constants";
import {absoluteUrl} from "../../utils/publiccodeAbsoluteUrl";
const useStyles = createUseStyles({
  link: {
    display: "block",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  logoContainer: {
    composes: "my-3",
    height: "150px",
    width: "100%",
  },
  category: {
    fontSize: "0.8rem",
    textTransform: "uppercase",
  },
  title: {
    composes: "pt-3 pt-md-0",
    color: "var(--black)",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textDecoration: "none",
    wordBreak: "break-word",
    "&:hover": {
      textDecoration: "none",
    },
  },
  description: {
    composes: "mt-3 mb-2",
    color: "var(--black)",
    fontSize: "0.9rem",
    fontWeight: "300",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  readMore: {
    textTransform: "uppercase",
    fontWeight: "600",
    marginTop: "auto",
    marginBottom: "2rem",
    "&:hover": {
      textDecoration: "none",
    },
  },
});

export const CatalogueItemGrid: React.FC<SearchType> = ({
  id,
  publiccode: { url: repoUrl, description, name, slug, categories, logo },
}) => {
  const classNamees = useStyles();
  const { t, i18n } = useTranslation();
  const category = getSoftwareCategory("");

  const localizedDescription =
    description[i18n.language] ||
    description.en ||
    description[Object.keys(description).find((k) => description[k])];
  const icon = "it-software";
  logo ||= description?.screenshots?.[0];
  const url = `/software/${slug.toLowerCase()}`;

  console.log(description);
  const isGridView = false;

  return (
    <article
      id={id}
      className="d-flex flex-column align-items-start h-100 mb-4 mb-sm-0 px-10"
      data-testid={id}
      data-className="catalogue-item"
    >
      <div>
        <Icon icon={icon} size="sm" className="mr-1" />
      </div>
      <div className="my-2 my-md-0 w-100">
        <a
          href={url}
          title={name}
          className={classNamees.link}
          data-testid="item-anchor"
        >
          {logo && (
            <div className={classNamees.logoContainer}>
              <ImageWithPlaceholder
                alt="logo"
                img={absoluteUrl(logo, repoUrl)}
              />
            </div>
          )}
          <div className={classNamees.title}>{name}</div>
          <div className={classNamees.description}>
            {localizedDescription.shortDescription}
          </div>
        </a>
      </div>
      <TagList tags={categories} visibleCount={3} />

      <a href={url} title={name} className={classNamees.readMore}>
        {t("readmore")} →
      </a>
    </article>
  );
};

export default CatalogueItemGrid;
