import React, { ChangeEventHandler, useState } from "react";
// import { Form, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Layout, Menu, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./navbar.css";

function Search() {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    console.log("SEARŰCH BUTTON");
    const url = `http://127.0.0.1:8000/poi/?search=${searchValue}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  };
  return (
    <div style={{ float: "right", width: "30%", paddingRight: "20px" }}>
      <Input
        style={{ padding: "6px 2px" }}
        prefix={
          <FaSearch
            style={{ color: "grey", height: "22px" }}
            onClick={handleSearch}
          />
        }
        placeholder="Keresés a POI nevében"
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
