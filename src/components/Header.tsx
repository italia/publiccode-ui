import "../components/Page/Page.scss"
import LogoHeader from '../../static/assets/inline/logo-header.svg';

import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
type Props = {
  children?: JSX.Element;
};
export const Header = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <div className="it-header-center-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="it-header-center-content-wrapper">
                <div className="it-brand-wrapper">
                  <Link to="/">
                    <LogoHeader />
                    <div className="it-brand-text">
                      <div className="it-brand-title fs-5 fw-bold text-white">
                        {data.site.siteMetadata.title}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-9">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Header.displayName = "Header";
