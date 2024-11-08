import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const TermsOfService = () => {
  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col>
          <h2>Conditions d'utilisation</h2>
          <p>Dernière mise à jour : 31 Octobre 2024</p>

          <section>
            <h4>1. Acceptation des conditions</h4>
            <p>
              En accédant à notre application et en l'utilisant, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre application.
            </p>
          </section>

          <section>
            <h4>2. Modifications des conditions</h4>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Toute modification sera publiée sur cette page et prendra effet immédiatement. Vous acceptez de consulter régulièrement cette page pour être informé de toute mise à jour.
            </p>
          </section>

          <section>
            <h4>3. Utilisation de l'application</h4>
            <p>
              Vous vous engagez à utiliser l'application uniquement à des fins légales et dans le respect de la législation en vigueur. Toute utilisation abusive de notre service entraînera la résiliation de votre accès.
            </p>
          </section>

          <section>
            <h4>4. Comptes d'utilisateur</h4>
            <p>
              Vous êtes responsable de la confidentialité de vos informations de connexion et de toute activité effectuée sous votre compte. Si vous suspectez une utilisation non autorisée de votre compte, veuillez nous en informer immédiatement.
            </p>
          </section>

          <section>
            <h4>5. Politique de confidentialité</h4>
            <p>
              Votre vie privée est importante pour nous. Veuillez consulter notre <a href="https://www.termsfeed.com/live/0747b562-edde-470e-9b7c-38a2b7e0f727/">politique de confidentialité</a> pour plus d'informations sur la manière dont nous recueillons, utilisons et protégeons vos données.
            </p>
          </section>

          <section>
            <h4>6. Limitation de responsabilité</h4>
            <p>
              Nous ne saurions être tenus responsables des dommages directs, indirects, ou consécutifs résultant de l'utilisation de notre application. Vous utilisez notre service à vos propres risques.
            </p>
          </section>

          <section>
            <h4>7. Propriété intellectuelle</h4>
            <p>
              Tout le contenu de cette application, y compris les textes, graphiques, logos, et images, est la propriété de Avc Predict et est protégé par les lois sur le droit d'auteur.
            </p>
          </section>

          <section>
            <h4>8. Résiliation</h4>
            <p>
              Nous nous réservons le droit de suspendre ou de résilier votre accès à l'application sans préavis en cas de violation des présentes conditions.
            </p>
          </section>

          <section>
            <h4>9. Contact</h4>
            <p>
              Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : beulleup4206@gmail.com.
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfService;
