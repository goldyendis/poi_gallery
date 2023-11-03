import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { POICategories } from "../Types/PoiTypes";
type CategoryMenuItemProps = {
  poiCat: POICategories;
  checked: boolean;
  onChange: Function;
  children?: React.ReactNode;
};

function CategoryMenuItem({
  poiCat,
  checked,
  onChange,
  children,
}: CategoryMenuItemProps) {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <li className={styles.mainCategory}>
        <div>
          <input
            type="checkbox"
            checked={checked}
            onClick={() => {
              onChange(poiCat.catNum);
              if (!checked && !expand) setExpand(true);
            }}
          />
        </div>
        <div className={styles.title}>
          <label
            style={{ width: "100%" }}
            onClick={() => setExpand((prev) => (prev = !prev))}
          >
            <span className={styles.categoryText}>{poiCat.catAlias}</span>
          </label>
          <span onClick={() => setExpand((prev) => (prev = !prev))}>
            {!expand ? (
              <IoIosArrowDropdownCircle />
            ) : (
              <IoIosArrowDropupCircle />
            )}
          </span>
        </div>
      </li>
      {expand ? children : null}
    </>
  );
}

export default CategoryMenuItem;
