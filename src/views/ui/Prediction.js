import { Container, Col, Row, Card, CardBody, CardTitle } from "reactstrap";
import React from "react";
const Prediction = () => {
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Liste des Prédictions déja effectuées
        </CardTitle>
        <CardBody className="">
          <Container>
            <Row>
              <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
                <Card body className="text-center">
                  <CardTitle tag="h5">Prédiction 1</CardTitle>
                  <p>Prédiction 1</p>
                </Card>
              </Col>
              <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
                <Card body className="text-center">
                  <CardTitle tag="h5">Prédiction 2</CardTitle>
                  <p>Prédiction 2</p>
                </Card>
              </Col>
              <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
                <Card body className="text-center">
                  <CardTitle tag="h5">Prédiction 3</CardTitle>
                  <p>Prédiction 3</p>
                </Card>
              </Col>
              <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
                <Card body className="text-center">
                  <CardTitle tag="h5">Prédiction 4</CardTitle>
                  <p>Prédiction 4</p>
                </Card>
              </Col>
            </Row> 
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default Prediction;
