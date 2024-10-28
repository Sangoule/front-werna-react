import React, { useState, useEffect } from "react";
import axios from "axios";

const LogsViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/logs")
      .then(response => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Erreur lors de la récupération des logs");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des logs...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Logs de l'Application</h3>
      <div className="list-group">
        {logs.map((log, index) => (
          <div key={index} className="list-group-item">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsViewer;
