import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import React from "react";
import DossierTable from "../../components/dashboard/DossierTable";
const Dossiers = () => {
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="12" sm="12">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Dossiers
            </CardTitle>
            <CardBody className="">
              <div>
                <DossierTable />
              </div>
            </CardBody>
          </Card>
        </Col>
        
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Dossiers;
