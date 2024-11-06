import React from 'react';
import { Row, Col, CardTitle, Button, CardSubtitle, Card } from 'reactstrap';
import ComponentCard from '../components/ComponentCard';

const About = () => {
  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            À propos de notre Projet
          </CardTitle>

          <Row className='d-flex'>
            <Col lg="8">
              <div className="mt-5">
                <ComponentCard
                  title="Contexte et Objectifs"
                  subtitle={
                    <h5>
                      Les avancées récentes de l’intelligence artificielle ont permis d’adopter de nouvelles
                      approches dans divers domaines, notamment le traitement du langage et des images.
                      Dans le domaine du traitement d’images, les réseaux de neurones ont contribué à une
                      précision accrue dans l’analyse et l’interprétation des données visuelles.
                    </h5>
                  }
                >
                  <img
                    src="https://path/to/your/project/image.jpg"
                    alt="projet illustration"
                    className="w-100"
                  />

                  <p className="mt-3">
                    L’objectif principal de notre projet est de concevoir un modèle performant capable de détecter
                    les accidents vasculaires cérébraux (AVC) à partir d’images d’IRM. En tirant parti des
                    techniques d’apprentissage automatique, nous visons à développer un outil fiable capable
                    de distinguer un cerveau sain (Normal) d’un cerveau affecté par un AVC (Stroke).
                  </p>

                  <p>
                    Pour atteindre cet objectif, nous avons opté pour un modèle de réseau de neurones comprenant
                    12 couches, que nous comparerons ensuite à d’autres modèles afin de sélectionner celui
                    qui offrira les meilleures performances pour notre tâche spécifique.
                  </p>
                </ComponentCard>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
