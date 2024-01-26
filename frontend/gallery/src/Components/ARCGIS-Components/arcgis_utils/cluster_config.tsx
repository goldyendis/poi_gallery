import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import img_101 from "../../images/101.png";
import img_102 from "../../images/102.png";
import img_103 from "../../images/103.png";
import img_104 from "../../images/104.png";
import img_105 from "../../images/105.png";
import img_106 from "../../images/106.png";
import img_107 from "../../images/107.png";
import img_108 from "../../images/108.png";
import img_201 from "../../images/201.png";
import img_202 from "../../images/202.png";
import img_203 from "../../images/203.png";
import img_204 from "../../images/204.png";
import img_205 from "../../images/205.png";
import img_206 from "../../images/206.png";
import img_207 from "../../images/207.png";
import img_208 from "../../images/208.png";
import img_209 from "../../images/209.png";
import img_211 from "../../images/211.png";
import img_212 from "../../images/212.png";
import img_301 from "../../images/301.png";
import img_302 from "../../images/302.png";
import img_304 from "../../images/304.png";
import img_305 from "../../images/305.png";
import img_306 from "../../images/306.png";
import img_307 from "../../images/307.png";
import img_401 from "../../images/401.png";
import img_402 from "../../images/402.png";
import img_403 from "../../images/403.png";
import img_405 from "../../images/405.png";
import img_406 from "../../images/406.png";
import img_407 from "../../images/407.png";
import img_408 from "../../images/408.png";
import img_501 from "../../images/501.png";
import img_503 from "../../images/503.png";
import img_504 from "../../images/504.png";
import img_505 from "../../images/505.png";
import img_506 from "../../images/506.png";
import img_601 from "../../images/601.png";
import img_602 from "../../images/602.png";
import img_603 from "../../images/603.png";
import img_604 from "../../images/604.png";
import img_605 from "../../images/605.png";
import img_606 from "../../images/606.png";
import img_607 from "../../images/607.png";
import img_608 from "../../images/608.png";
import img_609 from "../../images/609.png";
import img_610 from "../../images/610.png";
import img_611 from "../../images/611.png";
import img_612 from "../../images/612.png";
import img_701 from "../../images/701.png";
import img_702 from "../../images/702.png";
import img_703 from "../../images/703.png";
import img_704 from "../../images/704.png";
import img_705 from "../../images/705.png";
import img_706 from "../../images/706.png";
import img_707 from "../../images/707.png";
import img_708 from "../../images/708.png";
import img_710 from "../../images/710.png";
import img_711 from "../../images/711.png";
import img_712 from "../../images/712.png";
import img_801 from "../../images/801.png";
import img_802 from "../../images/802.png";
import img_901 from "../../images/901.png";
import img_902 from "../../images/902.png";
import img_903 from "../../images/903.png";
import img_904 from "../../images/904.png";
import img_906 from "../../images/906.png";
import img_907 from "../../images/907.png";
import img_908 from "../../images/908.png";
import img_909 from "../../images/909.png";
import img_910 from "../../images/910.png";
import img_1001 from "../../images/1001.png";
import img_1003 from "../../images/1003.png";
import img_1005 from "../../images/1005.png";
import img_1006 from "../../images/1006.png";
import img_1007 from "../../images/1007.png";
import img_1008 from "../../images/1008.png";
import img_1009 from "../../images/1009.png";
import img_1010 from "../../images/1010.png";
import img_1101 from "../../images/1101.png";
import img_1102 from "../../images/1102.png";
import img_1103 from "../../images/1103.png";
import img_1104 from "../../images/1104.png";
import img_1105 from "../../images/1105.png";
import img_1106 from "../../images/1106.png";
import img_1108 from "../../images/1108.png";
import img_1109 from "../../images/1109.png";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

export const clusterConfig = new FeatureReductionCluster({
  clusterMaxSize: 32,
  clusterRadius: 48,
  clusterMinSize: 18,
  maxScale: 2000,

  symbol: new SimpleMarkerSymbol({
    size: 6,
    color: "teal",
    outline: {
      color: "white",
      width: 0.5,
    },
  }),

  labelingInfo: [
    {
      deconflictionStrategy: "none",
      labelExpressionInfo: {
        expression: "Text($feature.cluster_count, '#,###')",
      },
      symbol: {
        type: "text",
        color: "white",
        font: {
          family: "Arial",
          size: "10px",
          weight: "bold",
        },
      },
      labelPlacement: "center-center",
    },
  ],

  popupTemplate: {
    content: "<b>{cluster_count}</b> POI található a területen",
  },
});

const typeToImageUrl = {
  "101": img_101,
  "102": img_102,
  "103": img_103,
  "104": img_104,
  "105": img_105,
  "106": img_106,
  "107": img_107,
  "108": img_108,
  "201": img_201,
  "202": img_202,
  "203": img_203,
  "204": img_204,
  "205": img_205,
  "206": img_206,
  "207": img_207,
  "208": img_208,
  "209": img_209,
  "210": img_204,
  "211": img_211,
  "212": img_212,
  "301": img_301,
  "302": img_302,
  "304": img_304,
  "305": img_305,
  "306": img_306,
  "307": img_307,
  "401": img_401,
  "402": img_402,
  "403": img_403,
  "406": img_406,
  "405": img_405,
  "407": img_407,
  "408": img_408,
  "501": img_501,
  "502": img_501,
  "503": img_503,
  "504": img_504,
  "505": img_505,
  "506": img_506,
  "601": img_601,
  "602": img_602,
  "603": img_603,
  "604": img_604,
  "605": img_605,
  "606": img_606,
  "607": img_607,
  "608": img_608,
  "609": img_609,
  "610": img_610,
  "611": img_611,
  "612": img_612,
  "701": img_701,
  "702": img_702,
  "703": img_703,
  "704": img_704,
  "705": img_705,
  "706": img_706,
  "707": img_707,
  "708": img_708,
  "709": img_712,
  "710": img_710,
  "711": img_711,
  "712": img_712,
  "801": img_801,
  "802": img_802,
  "901": img_901,
  "902": img_902,
  "903": img_903,
  "904": img_904,
  "905": img_910,
  "906": img_906,
  "907": img_907,
  "908": img_908,
  "909": img_909,
  "910": img_910,
  "1001": img_1001,
  "1002": img_1010,
  "1003": img_1003,
  "1004": img_1003,
  "1005": img_1005,
  "1006": img_1006,
  "1007": img_1007,
  "1008": img_1008,
  "1009": img_1009,
  "1010": img_1010,
  "1101": img_1101,
  "1102": img_1102,
  "1103": img_1103,
  "1104": img_1104,
  "1105": img_1105,
  "1106": img_1106,
  "1107": img_1109,
  "1108": img_1108,
  "1109": img_1109,
};

const createUniqueValueSymbols = () => {
  return Object.entries(typeToImageUrl).map(([value, imageUrl]) => ({
    value,
    symbol: new PictureMarkerSymbol({
      url: imageUrl,
      height: 20,
      width: 20,
    }),
  }));
};

export const renderer = new UniqueValueRenderer({
  field: "poitype",
  uniqueValueInfos: createUniqueValueSymbols(),
});
