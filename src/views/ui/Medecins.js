import React, { useState } from "react";


const Medecins = () => {

  return (
    <div className="row flex-grow">
      <div className="col-12 grid-margin stretch-card">
        <div className="card card-rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="card-title card-title-dash">Médecins</h4>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                    <div className="d-flex">
                      <img className="img-sm rounded-10" src="images/faces/face1.jpg" alt="profile" />
                      <div className="wrapper ms-3">
                        <p className="ms-1 mb-1 fw-bold">Brandon Washington</p>
                        <small className="text-muted mb-0">162543</small>
                      </div>
                    </div>
                    <div className="text-muted text-small">
                      1h ago
                    </div>
                  </div>
                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                    <div className="d-flex">
                      <img className="img-sm rounded-10" src="images/faces/face2.jpg" alt="profile" />
                      <div className="wrapper ms-3">
                        <p className="ms-1 mb-1 fw-bold">Wayne Murphy</p>
                        <small className="text-muted mb-0">162543</small>
                      </div>
                    </div>
                    <div className="text-muted text-small">
                      1h ago
                    </div>
                  </div>
                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                    <div className="d-flex">
                      <img className="img-sm rounded-10" src="images/faces/face3.jpg" alt="profile" />
                      <div className="wrapper ms-3">
                        <p className="ms-1 mb-1 fw-bold">Katherine Butler</p>
                        <small className="text-muted mb-0">162543</small>
                      </div>
                    </div>
                    <div className="text-muted text-small">
                      1h ago
                    </div>
                  </div>
                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                    <div className="d-flex">
                      <img className="img-sm rounded-10" src="images/faces/face4.jpg" alt="profile" />
                      <div className="wrapper ms-3">
                        <p className="ms-1 mb-1 fw-bold">Matthew Bailey</p>
                        <small className="text-muted mb-0">162543</small>
                      </div>
                    </div>
                    <div className="text-muted text-small">
                      1h ago
                    </div>
                  </div>
                  <div className="wrapper d-flex align-items-center justify-content-between pt-2">
                    <div className="d-flex">
                      <img className="img-sm rounded-10" src="images/faces/face5.jpg" alt="profile" />
                      <div className="wrapper ms-3">
                        <p className="ms-1 mb-1 fw-bold">Rafell John</p>
                        <small className="text-muted mb-0">Alaska, USA</small>
                      </div>
                    </div>
                    <div className="text-muted text-small">
                      1h ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Medecins;
