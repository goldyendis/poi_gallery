import React from "react";
import { Layout } from "antd";
import mtszImage from "./mtsz.png";
import "./header.css";
import Search from "./Search";
const { Header } = Layout;

function MyHeader() {
  return (
    <Header className="my-header">
      <div className="left-content">
        <a className="logo-link" href="https://www.mtsz.org/">
          <img className="logo-img" alt="" src={mtszImage} />
        </a>
        <div>
          <span>MTSZ POI Galéria</span>
        </div>
      </div>
      <Search />
    </Header>
  );
}

export default MyHeader;
