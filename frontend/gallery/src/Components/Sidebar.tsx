import React from "react";
import { Layout } from "antd";
import { lightGreen } from "@mui/material/colors";

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider
      className=""
      width={"15vw"}
      style={{ backgroundColor: "#C8E6C9", height: "100vh" }}
    ></Sider>
  );
}
