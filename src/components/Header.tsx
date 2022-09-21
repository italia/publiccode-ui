import React from 'react';

export const Header = () => {
  return (
    <>
      <div className="it-header-center-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="it-header-center-content-wrapper">
                <div className="it-brand-wrapper">
                  <div className="fs-5 fw-bold text-white">EU Public Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Header.displayName = 'Header';
