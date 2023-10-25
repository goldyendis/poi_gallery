import React from "react";
import { Layout } from "antd";
import mtszImage from "./mtsz.png";
import "./navbar.css";
import Search from "./Search";
const { Header } = Layout;

function NavBar() {
  return (
    <>
      <Header className="my-header">
        <div className="left-content">
          <a href="https://www.mtsz.org/">
            <img alt="" src={mtszImage} />
          </a>
          <div className="title-text">
            <span>MTSZ POI Galéria</span>
          </div>
        </div>
        <Search />
      </Header>
    </>
  );
}

export default NavBar;
