import { useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import axios from "axios";
import { backendURL } from "../utils/urls_development";
import { getTypesInCategory, parseFilterData } from "../utils/poi_data";
import { FilterData, FilterQuery, POIType } from "../Types/PoiTypes";
import styles from "./Sidebar.module.css";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import CategoryMenuItem from "./CategoryMenuItem";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TypeMenuItem from "./TypeMenuItem";
import { BiFilterAlt } from "react-icons/bi";

const { Sider } = Layout;

const fetchFilterValues = async () => {
  const response = await axios.get(backendURL + "/poi/filter/");
  const parsedData: FilterData = parseFilterData(response);
  return parsedData;
};

export default function Sidebar() {
  const [selectedFilters, setSelectedFilters] = useState<FilterQuery[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  let poiTypeParam = searchParams.getAll("poitype");
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilterValues,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (poiTypeParam.length > 0) {
      const poiTypeQueryArray: string[] = poiTypeParam[0].split(",");
      poiTypeQueryArray.forEach((poitype, index) => {
        const catNum = Math.floor(parseInt(poitype) / 100) * 100;
        selectTypeToogle(parseInt(poitype), catNum);
      });
    }
  }, []);

  const selectCategoryToogle = (catNum: number) => {
    if (selectedFilters === undefined) {
    }
    const filterQueryExists = selectedFilters.some(
      (filter) => filter.categories === catNum
    );
    setSelectedFilters((prev) => {
      if (!filterQueryExists) {
        const typesInCategory = getTypesInCategory(data!, catNum);
        return [...prev, new FilterQuery(catNum, [...typesInCategory])];
      } else {
        const newSelectedFilter = selectedFilters.filter(
          (filterQuery) => filterQuery.categories !== catNum
        );
        return newSelectedFilter;
      }
    });
  };

  const selectTypeToogle = (typeNum: number, catNum: number) => {
    const filterCategoryExists = selectedFilters.some((filter) => {
      return filter.categories === catNum;
    });
    const filterTypeExists = selectedFilters.some(
      (filter) =>
        filter.categories === catNum &&
        filter.types?.some((number) => number === typeNum)
    );
    setSelectedFilters((prev) => {
      if (!filterCategoryExists) {
        return [...prev, new FilterQuery(catNum, [typeNum])];
      } else {
        if (!filterTypeExists) {
          return prev.map((filterQuery, index) => {
            if (filterQuery.categories === catNum) {
              filterQuery.types?.push(typeNum);
            }
            return filterQuery;
          });
        } else {
          return prev.map((filterQuery) => {
            if (filterQuery.categories === catNum) {
              filterQuery.types = filterQuery.types?.filter(
                (number) => number !== typeNum
              );
            }
            return filterQuery;
          });
        }
      }
    });
  };

  const createQueryParam = () => {
    const searchParam = new URLSearchParams();
    if (selectedFilters.length > 0) {
      const selectedTypesString: string = selectedFilters
        .map((filterQuery) => {
          return filterQuery.types.toString();
        })
        .join(",");
      searchParam.append("poitype", selectedTypesString);
    }
    navigate(`?${searchParam}`);
  };

  const isCategoryChecked = (categoryNumber: number) => {
    return selectedFilters.some(
      (filter) => filter.categories === categoryNumber
    );
  };

  const isTypeChecked = (typeNum: number) => {
    return selectedFilters.some((filter) =>
      filter.types.some((number) => number === typeNum)
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Sider
      breakpoint="sm"
      className={styles.sidebar}
      collapsedWidth="0"
      theme={"dark"}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className={styles.btnFilter} onClick={createQueryParam}>
          <BiFilterAlt></BiFilterAlt>
          <span className={styles.buttonText}>Szűrés</span>
        </button>
      </div>
      <ul>
        {data?.categories.map((category) => (
          <CategoryMenuItem
            poiCat={category}
            checked={isCategoryChecked(category.catNum)}
            onChange={selectCategoryToogle}
            key={category.catNum}
          >
            {data?.types
              .filter(
                (types) =>
                  category.catNum + 100 > types.typeNum &&
                  types.typeNum > category.catNum
              )
              .map((types) => {
                return (
                  <TypeMenuItem
                    poiType={types}
                    checked={isTypeChecked(types.typeNum)}
                    onChange={selectTypeToogle}
                    key={types.typeNum}
                  ></TypeMenuItem>
                );
              })}
          </CategoryMenuItem>
        ))}
      </ul>
    </Sider>
  );
}
