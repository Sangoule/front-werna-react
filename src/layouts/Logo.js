import  LogoDark  from "../assets/images/logos/saytuavc-1.png";
import { Link } from "react-router-dom";
import React from "react";
const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoDark} alt="Logo"  width="170px" height="170px"/>
    </Link>
  );
};

export default Logo;
