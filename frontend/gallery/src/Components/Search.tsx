import React, { ChangeEventHandler, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";

function Search() {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
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
    <InputGroup
      className="kereses"
      style={{ paddingRight: "15px", overflow: "auto", width: "33%" }}
    >
      <Form.Control
        type="text"
        placeholder="Keresés a POI nevében"
        onChange={handleChange}
        //   onKeyDown={}
      ></Form.Control>
      <Button
        style={{ backgroundColor: "rgb(3,90,20)", border: "none" }}
        onClick={handleSearch}
      >
        <FaSearch />
      </Button>
    </InputGroup>
  );
}

export default Search;
