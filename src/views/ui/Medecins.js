import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Medecins = () => {
  const [medecins, setMedecins] = useState([]);
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (userData) {
      const userToken = userData.access_token;

      const fetchMedecins = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/medecins/', {
            headers: {
              Authorization: `Bearer ${userToken}`, // Envoi du token
            },
          });
          setMedecins(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des médecins:", error);
        }
      };

      fetchMedecins();
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

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
                  {medecins.map((medecin) => (
                    <div key={medecin.id} className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                      <div className="d-flex">
                        <img className="img-sm rounded-10" src={`images/faces/${medecin.photo}`} alt="profile" />
                        <div className="wrapper ms-3">
                          <p className="ms-1 mb-1 fw-bold">{medecin.name}</p>
                          <small className="text-muted mb-0">{medecin.id}</small>
                        </div>
                      </div>
                      <div className="text-muted text-small">
                        {medecin.lastSeen} ago
                      </div>
                    </div>
                  ))}
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
