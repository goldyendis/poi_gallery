export interface POIData {
  meta: {
    count: number | null;
    next: string | null;
    previous: string | null;
  };
  result: POI[];
}

export interface POI {
  objectid: number;
  surveydate: string;
  poicat: number;
  poitype: number;
  poiname: string | "";
  poi_id: string;
  img_flag: boolean;
  existing: boolean;
  thumbnail: string | "";
  notes: string;
  shape: string;
  image_list: string[];
}
