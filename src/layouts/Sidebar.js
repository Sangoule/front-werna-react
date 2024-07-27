import { Button, Nav, NavItem, Input } from "reactstrap";
// import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const navigation = [
  {
    title: "Dossier",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Medecins",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Patients",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Prédictions",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Résultats",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Notifications",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
      <div className="row d-flex">
          <div className="align-items-center col-md-9">
            <span className="fw-bold">Espace Admin</span>
          </div>
          <div className="col-md-3 ">
            <img
              src="../assets/images/users/user1.jpg"
              className="rounded-circle"
              width="40"
              height="40"
            />
          </div>
        </div>
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {/* Ajout d'un titre de section */}
              <div className="nav-title py-2">
                <span className="text-secondary">{navi.title}</span>
              </div>
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
              
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
