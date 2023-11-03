import { FaSearch } from "react-icons/fa";
import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let searchParams = new URLSearchParams();
      searchParams.set("search", searchValue);
      navigate(`?${searchParams}`);
    }
  };

  return (
    <div style={{ float: "right", width: "30%", paddingRight: "20px" }}>
      <Input
        style={{ padding: "6px 2px" }}
        prefix={
          <FaSearch style={{ color: "grey", height: "22px", margin: "2px" }} />
        }
        placeholder="Keresés"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
    </div>
  );
}

export default Search;
