import React from "react";
import styles from "./Sidebar.module.css";
import { POIType } from "../Types/PoiTypes";

type TypeMenuItemProps = {
  poiType: POIType;
  checked: boolean;
  onChange: Function;
};

function TypeMenuItem({ poiType, checked, onChange }: TypeMenuItemProps) {
  return (
    <div style={{ padding: "0px 5px 0px 5px" }}>
      <li
        className={styles.mainType}
        onClick={() => {
          onChange(poiType.typeNum, poiType.catNum);
        }}
      >
        <div className={styles.typetitle}>
          <input type="checkbox" checked={checked} />
          <label style={{ padding: "3px" }}>
            <span>{poiType.typeAlias}</span>
          </label>
        </div>
      </li>
    </div>
  );
}

export default TypeMenuItem;
