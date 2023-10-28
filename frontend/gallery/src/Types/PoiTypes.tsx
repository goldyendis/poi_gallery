import { ImageSource } from "yet-another-react-lightbox/*";

export type POIData = {
  meta: {
    count: number | null;
    next: string | null;
    previous: string | null;
  };
  result: POI[];
};

type ImagesSource = {
  src: string;
  width: number;
  height: number;
};

export type POI = {
  objectid: number;
  surveydate: string;
  poicat: number;
  poicat_alias: string;
  poitype: number;
  poitype_alias: string;
  poiname: string | "";
  poi_id: string;
  img_flag: boolean;
  existing: boolean;
  thumbnail: string | "";
  notes: string;
  shape: string;
  images_list: string[];
};
