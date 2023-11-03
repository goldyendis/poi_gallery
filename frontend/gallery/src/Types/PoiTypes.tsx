export type POIData = {
  meta: {
    count: number | null;
    next: string | null;
    previous: string | null;
  };
  result: POI[];
};

class geoPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

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

export class FilterData {
  categories: POICategories[];
  types: POIType[];
  constructor(categories: POICategories[], types: POIType[]) {
    this.categories = categories;
    this.types = types;
  }
}

export class FilterQuery {
  categories: number;
  types: number[];
  constructor(categories: number, types: number[]) {
    this.categories = categories;
    this.types = types;
  }
}
