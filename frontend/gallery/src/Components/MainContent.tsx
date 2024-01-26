import styles from "./MainContent.module.css";
import { POI, POIData } from "../Types/PoiTypes";
import { fetchPOIList, updateSearchParams } from "../utils/urls_development";
import { useSearchParams, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { lazy } from "react";
type MainContentProp = {
  active: boolean;
};
const Spinner = lazy(() => import("./Spinner"));
const POICard = lazy(() => import("./POICard"));

export default function MainContent({ active }: MainContentProp) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryString = updateSearchParams(searchParams);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage && isHomeRoute) {
        fetchNextPage();
      }
    },
  });
  const isHomeRoute = location.pathname === "/poigallery/";
  const query = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }): Promise<POIData> => {
    if (isHomeRoute) {
      const poiData: POIData = await fetchPOIList(
        queryString + `&page=${pageParam}`
      );
      return poiData;
    }
    const poidata_empty: POIData = {
      meta: { count: 0, next: null, previous: null },
      result: [],
    };
    return poidata_empty;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`list/${searchParams}`],
      queryFn: query,
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (!lastPage || !lastPage.meta || !lastPage.meta.next) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (_, __, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
      refetchOnWindowFocus: false,
      enabled: isHomeRoute,
    });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={active ? styles.contentActive : styles.contentInactive}>
      <div className={active ? styles.customGrid : styles.customGridInactive}>
        {data?.pages.map((group) =>
          group.result.map((poi: POI) => {
            return <POICard poi={poi} key={poi.objectid} />;
          })
        )}
      </div>
      <div className={styles.moreDataDiv} ref={ref}>
        <button className="btn-moreData"></button>
      </div>
    </div>
  );
}
