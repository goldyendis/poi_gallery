import { lazy, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  createQueryParam,
  mergeFilterAndOtherSearchParams,
  updateSearchParams,
} from "../../utils/urls_development";
import {
  fetchFilterValues,
  isCategoryChecked,
  isTypeChecked,
  getTypesInCategory,
} from "../../utils/filtering_helper";
import styles from "./DropDownContent.module.css";

type DropDownContentProps = {
  onChange: (visible: boolean) => void;
};
const CategoryMenuItem = lazy(() => import("./CategoryMenuItem"));
const TypeMenuItem = lazy(() => import("./TypeMenuItem"));

function DropDownContent({ onChange }: DropDownContentProps) {
  const [selectedTypeFilters, setSelectedTypeFilters] = useState<number[]>([]);
  const [searchParams] = useSearchParams();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilterValues,
    staleTime: Infinity,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        event.target instanceof Node &&
        !overlayRef.current.contains(event.target)
      ) {
        onChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onChange]);

  useEffect(() => {
    setSelectedTypeFilters([]);
    const poiTypeParam = searchParams.getAll("poitype");
    if (poiTypeParam.length > 0) {
      const poiTypeQueryArray: string[] = poiTypeParam[0].split(",");
      poiTypeQueryArray.forEach((poitype) => {
        setSelectedTypeFilters((prev) => [...prev, parseInt(poitype)]);
      });
    }
  }, [searchParams]);

  const selectCategoryToggle = (catNum: number) => {
    setSelectedTypeFilters((prev) => {
      const typesInCategory = getTypesInCategory(data!, catNum);

      if (isCategoryChecked(catNum, prev)) {
        return prev.filter((type) => !typesInCategory.includes(type));
      } else {
        const newSelectedTypes = typesInCategory.filter(
          (type) => !prev.includes(type)
        );
        return [...prev, ...newSelectedTypes];
      }
    });
  };

  const selectTypeToggle = (typeNum: number) => {
    setSelectedTypeFilters((prev) => {
      const isTypeSelected = prev.includes(typeNum);

      if (isTypeSelected) {
        return prev.filter((type) => type !== typeNum);
      } else {
        return [...prev, typeNum];
      }
    });
  };

  const applyFilters = () => {
    onChange(false);
    const params = updateSearchParams(
      mergeFilterAndOtherSearchParams(
        createQueryParam(selectedTypeFilters),
        searchParams
      )
    );
    navigate(`?${params}`);
  };

  return (
    <div className={styles.customMenu} ref={overlayRef}>
      <button
        className={styles.dropdown_btnFilter}
        key="filter"
        onClick={applyFilters}
      >
        <span className={styles.buttonText}>Szűrés</span>
      </button>
      <ul className={styles.ulCategory}>
        {data?.categories.map((category) => (
          <CategoryMenuItem
            poiCat={category}
            checked={isCategoryChecked(category.catNum, selectedTypeFilters)}
            onChange={selectCategoryToggle}
            key={category.catNum}
          >
            <ul className={styles.ulType}>
              {data?.types
                .filter(
                  (types) =>
                    category.catNum + 100 > types.typeNum &&
                    types.typeNum > category.catNum
                )
                .map((types) => (
                  <TypeMenuItem
                    poiType={types}
                    checked={isTypeChecked(types.typeNum, selectedTypeFilters)}
                    onChange={selectTypeToggle}
                    key={types.typeNum}
                  ></TypeMenuItem>
                ))}
            </ul>
          </CategoryMenuItem>
        ))}
      </ul>
    </div>
  );
}

export default DropDownContent;
