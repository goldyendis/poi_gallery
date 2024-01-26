import {ReactNode, useState } from "react";
import styles from "./CategoryMenuItem.module.css";
import { POICategories } from "../../Types/PoiTypes";
import ArrowDownCircle from "../Icons/ArrowDownCircle";
import ArrowUpCircle from "../Icons/ArrowUpCircle";

type CategoryMenuItemProps = {
  poiCat: POICategories;
  checked: boolean;
  onChange: Function;
  children?: ReactNode;
};

function CategoryMenuItem({
  poiCat,
  checked,
  onChange,
  children,
}: CategoryMenuItemProps) {
  const [expand, setExpand] = useState(false);

  return (
    <div className={styles.divCategory}>
      <li
        className={styles.mainCategory}
        onClick={() => setExpand((prev) => (prev = !prev))}
      >
        <div>
          <label>
            <input
              id={poiCat.catAlias}
              type="checkbox"
              checked={checked}
              onChange={() => {
                onChange(poiCat.catNum);
              }}
            />
          </label>
        </div>
        <div className={styles.title}>
          <span>{poiCat.catAlias}</span>
          <span>{!expand ? <ArrowDownCircle /> : <ArrowUpCircle />}</span>
        </div>
      </li>
      {expand ? children : null}
    </div>
  );
}

export default CategoryMenuItem;
