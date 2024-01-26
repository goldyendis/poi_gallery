import { useState, Suspense, lazy } from "react";
import styles from "./FilterDropDown.module.css";
import IconSliders from "../Icons/IconSliders";
import ArrowDownCircle from "../Icons/ArrowDownCircle";
import ArrowUpCircle from "../Icons/ArrowUpCircle";

const DropDownContent = lazy(() => import("./DropDownContent"));
const FilterSpinner = lazy(() => import("./FilterSpinner"));

const FilterDropDown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onDropdownVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };

  return (
    <div>
      <button
        className={styles.btnFilter}
        onClick={() => onDropdownVisibleChange(!dropdownVisible)}
      >
        <IconSliders />
        <span>Szűrő</span>
        {dropdownVisible ? <ArrowUpCircle /> : <ArrowDownCircle />}
      </button>
      {dropdownVisible && (
        <Suspense fallback={<FilterSpinner />}>
          <DropDownContent onChange={onDropdownVisibleChange} />
        </Suspense>
      )}
    </div>
  );
};

export default FilterDropDown;
