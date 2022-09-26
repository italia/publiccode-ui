import React from "react";

export const HeaderSearch = ({ children }) => {
  return (
    <>
      <div className="it-header-center-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="it-header-center-content-wrapper">
                <div className="it-brand-wrapper">
                  <a href="#">
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
                  </a>
                </div>
              </div>
            </div>
            <div className="col-9 mt-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HeaderSearch.displayName = "HeaderSearch";
