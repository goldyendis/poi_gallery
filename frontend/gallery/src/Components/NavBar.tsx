import React from "react";
import { Navbar } from "react-bootstrap";
import mtszImage from "./mtsz.png";
import "./navbar.css";
import Search from "./Search";

function NavBar() {
  return (
    <>
      <Navbar
        bg="success"
        data-bs-theme="light"
        fixed="top"
        className="justify-content-between"
      >
        <Navbar.Brand href="https://www.mtsz.org/">
          <img alt="" src={mtszImage} />
          <span>MTSZ POI Galéria</span>
        </Navbar.Brand>
        <Search />
      </Navbar>
    </>
  );
}

export default NavBar;
