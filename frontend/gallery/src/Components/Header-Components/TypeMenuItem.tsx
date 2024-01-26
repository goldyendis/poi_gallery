import styles from "./TypeMenuItem.module.css";
import { POIType } from "../../Types/PoiTypes";

type TypeMenuItemProps = {
  poiType: POIType;
  checked: boolean;
  onChange: Function;
};

function TypeMenuItem({ poiType, checked, onChange }: TypeMenuItemProps) {
  return (
    <div className={styles.divType}>
      <li className={styles.mainType}>
        <label className={styles.checkboxLabel}>
          <input
            id={poiType.typeNum.toString()}
            type="checkbox"
            checked={checked}
            onChange={() => {
              onChange(poiType.typeNum, poiType.catNum);
            }}
          />
          <span>{poiType.typeAlias}</span>
        </label>
      </li>
    </div>
  );
}

export default TypeMenuItem;
