import { Link } from "gatsby";
import React from "react";
type Props = {
  children?: JSX.Element;
};
export const Header = ({ children }: Props) => {
  return (
    <>
      <div className="it-header-center-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="it-header-center-content-wrapper">
                <div className="it-brand-wrapper">
                  <Link to="/">
                    <svg height="96" width="96">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="black"
                        stroke-width="1"
                        fill="white"
                      />
                    </svg>
                    <div className="it-brand-text">
                      <div className="it-brand-title fs-5 fw-bold text-white">
                        EU Public Code
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
