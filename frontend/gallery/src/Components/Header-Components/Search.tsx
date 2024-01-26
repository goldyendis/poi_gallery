import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconSearch from "../Icons/IconSearch";
import Delete from "../Icons/Delete";
import styles from "./Search.module.css";

function Search() {
  const [searchValue, setSearchValue] = useState<string | null>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.has("search")) {
      setSearchValue(null);
      return;
    }
    setSearchValue(searchParams.get("search"));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!searchValue) return;
      searchParams.delete("page");
      searchParams.set("search", searchValue);
      navigate(`?${searchParams}`);
    }
  };

  const handleClear = (): void => {
    setSearchValue(null);
    searchParams.delete("search");
    searchParams.delete("page");
    navigate(`?${searchParams}`);
  };

  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>
        <IconSearch />
      </span>
      <input
        id="searchField"
        type="text"
        value={searchValue || ""}
        placeholder="Keresés"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      {searchValue && (
        <button className={styles.clearButton} onClick={handleClear}>
          <Delete />
        </button>
      )}
    </div>
  );
}

export default Search;
