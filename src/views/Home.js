import { Col, Row } from "reactstrap";
import FileUploadForm from "../components/FileUploadForm";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";
import React, { useEffect, useState } from "react";
// import Feeds from "../components/dashboard/Feeds"; // Décommenter si vous l'utilisez
// import ProjectTables from "../components/dashboard/ProjectTable"; // Décommenter si vous l'utilisez
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Utilisez cette syntaxe sans `default`


const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    users: 0,
    doctors: 0,
    patients: 0,
    predictions: 0,
  });

  const fetchCounts = async () => {
    try {
      const usersResponse = await fetch("http://127.0.0.1:8000/api/users/count/");
      const usersData = await usersResponse.json();
      
      const doctorsResponse = await fetch("http://127.0.0.1:8000/api/medecins/count/");
      const doctorsData = await doctorsResponse.json();
      
      const patientsResponse = await fetch("http://127.0.0.1:8000/api/patients/count/");
      const patientsData = await patientsResponse.json();
      
      const predictionsResponse = await fetch("http://127.0.0.1:8000/api/predictions/count/");
      const predictionsData = await predictionsResponse.json();

      setCounts({
        users: usersData.count,
        doctors: doctorsData.count,
        patients: patientsData.count,
        predictions: predictionsData.count,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des comptes :", error);
    }
  };
  useEffect(() => {
    // Vérifie si un utilisateur est stocké dans le localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      // Vérifie si un token est présent dans les cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
      console.log("Token trouvé:", token);
      if (token) {
        const userData = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log("Utilisateur connecté home:", userData);
      } else {
        navigate('/auth/login'); // Redirige vers la page de connexion si aucun token n'est trouvé
      }
    }
  }, [navigate]);
  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Utilisateurs"
            subtitle="Nombre d'utilisateurs"
            earning={counts.users} // Utilisation de la valeur dynamique
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Médecins"
            subtitle="Nombre de Médecins"
            earning={counts.doctors} // Utilisation de la valeur dynamique
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Patients"
            subtitle="Nombre de Patients"
            earning={counts.patients} // Utilisation de la valeur dynamique
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info" // Corrigé de "text-into" à "text-info"
            title="Prédictions"
            subtitle="Prédictions effectuées"
            earning={counts.predictions} // Utilisation de la valeur dynamique
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col>
          <SalesChart />
        </Col>
        {/* <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col> */} {/* Décommenter si vous l'utilisez */}
      </Row>
      
      {/***Table ***/}
      {/* <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row> */} {/* Décommenter si vous l'utilisez */}
      {/***Blog Cards***/}
      {/* <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row> */} {/* Décommenter si vous l'utilisez */}
    </div>
  );
};

export default Home;
