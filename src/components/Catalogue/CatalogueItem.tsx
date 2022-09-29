import React from "react";
import '../Page/Page.scss';
import { createUseStyles } from "react-jss";
import { ImageWithPlaceholder } from "../ImageWithPlaceholder";
import { SearchType } from "../../utils/proptypes";
import { useTranslation } from "react-i18next";

import { TagList } from "../TagList";
import { Link } from "gatsby";
const useStyles = createUseStyles({
  link: {
    display: "block",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  logoContainer: {
    height: "64px",
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

export const CatalogueItem: React.FC<SearchType> = ({
  id,
  publiccode: {
    description,
    name,
    slug,
    categories,
    logo: plogo,
    releaseDate,
    license,
  },
}) => {
  const classNamees = useStyles();
  const { t, i18n } = useTranslation();

  const localizedDescription =
    description[i18n.language] ||
    description.en ||
    description[Object.keys(description).find((k) => description[k]) || 0];
  const logo = localizedDescription?.screenshots?.[0] ?? plogo ?? null;

  return (
    <div className="row">
      <hr className="border-1 border border-muted mb-4" />
      <div className="col-sm-2 col-lg-2">
        <Link to={id} title={name} data-testid="item-anchor">
          <div className={classNamees.logoContainer}>
            <ImageWithPlaceholder
              alt="logo"
              img={logo}
            />
          </div>
        </Link>
      </div>
      <div className="col-6 mb-4">
        <Link
          to={id}
          title={name}
          data-testid="item-anchor"
          className={classNamees.link}
        >
          <h3 className="card-title big-heading h5 fw-semibold">{name}</h3>
        </Link>
        <p className="card-text fs-6 fw-normal lh-2 mb-4">{localizedDescription.shortDescription}</p>

        <TagList tags={categories} visibleCount={3} isShowMoreVisible={false} />
      </div>
      <div className="d-none d-lg-block col-lg-2">
        <div className="row fs-6 fw-bolder">{t("software.last_release")}</div>
        <div className="row fs-6 fw-bold">{releaseDate}</div>
      </div>
      <div className="d-none d-lg-block col-lg-2">
        <div className="row fs-6 fw-bolder">{t("software.license")}</div>
        <div className="row fs-6 fw-bold">{license}</div>
      </div>
    </div>
  );
};

export default CatalogueItem;
