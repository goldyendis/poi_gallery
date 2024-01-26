export type POIData = {
  meta: {
    count: number | null;
    next: string | null;
    previous: string | null;
  };
  result: POI[];
};
export type POIMapData = {
  meta: {
    count: number | null;
    next: string | null;
    previous: string | null;
  };
  result: mapPOIData[];
};

class geoPoint {
  x: number;
  y: number;
  constructor(coord: number[]) {
    this.x = coord[0];
    this.y = coord[1];
  }
}

export type mapPOIData = {
  o: number;
  poitype: string;
  coordinates: number[];
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
  coordinates: geoPoint;
  images_list: string[];
};

export class POICategories {
  catNum: number;
  catAlias: string;
  constructor(catNum: number, catAlias: string) {
    this.catNum = catNum;
    this.catAlias = catAlias;
  }
}

export class POIType {
  typeNum: number;
  typeAlias: string;
  catNum: number;
  constructor(typeNum: number, typeAlias: string, catNum: number) {
    this.typeNum = typeNum;
    this.typeAlias = typeAlias;
    this.catNum = catNum;
  }
}

export type popUp = {
  objectid: number;
  thumbnail: string;
  title: string;
};
