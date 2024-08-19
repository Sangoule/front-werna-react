import { Outlet } from "react-router-dom";

import { Container } from "reactstrap";
import React from "react";
const AuthLayout = () => {
  return (
    <main>
      <Container className="p-4 wrapper" fluid>
        <Outlet />
      </Container>
    </main>
  );
};

export default AuthLayout;
