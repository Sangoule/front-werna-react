import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Alert } from "reactstrap";

const LogsViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/logs")
      .then((response) => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des logs");
        setLoading(false);
      });
  }, []);

  const renderLogItem = (log) => {
    // Assure l'extraction de différents types de logs
    const logType = log.toLowerCase().includes("error")
      ? "error"
      : log.toLowerCase().includes("warning")
      ? "warning"
      : "info";

    const logStyles = {
      error: "list-group-item-danger text-danger",
      warning: "list-group-item-warning text-warning",
      info: "list-group-item-info text-primary",
    };

    return (
      <div key={log} className={`list-group-item ${logStyles[logType]}`}>
        {log}
      </div>
    );
  };

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner color="primary" />
        <p>Chargement des logs...</p>
      </div>
    );
  if (error) return <Alert color="danger">{error}</Alert>;

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-center text-primary">Logs de l'Application</h3>
      <div className="list-group">
        {logs.length > 0 ? (
          logs.map((log, index) => renderLogItem(log, index))
        ) : (
          <p className="text-center text-muted">Aucun log disponible</p>
        )}
      </div>
    </div>
  );
};

export default LogsViewer;
