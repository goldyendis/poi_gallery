import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Share from "yet-another-react-lightbox/plugins/share";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "./poidetails.css";

import { POI } from "../Types/PoiTypes";
import axios from "axios";
import { parsePOI } from "../functions/poi_data";
import { useQuery } from "@tanstack/react-query";
import { render } from "react-dom";

type POIDetailProps = {
  open: boolean;
  close: Function;
  poi: POI;
};
const fetchPOI = async (id: number): Promise<POI> => {
  const url = `http://127.0.0.1:8000/surveypoi/poi/${id}/`;
  const response = await axios.get(url);
  const parsedData: POI = parsePOI(response);
  return parsedData;
};

function POIDetail({ open, close, poi }: POIDetailProps) {
  const { isLoading, data } = useQuery({
    queryKey: [`poi/${poi.objectid}`],
    queryFn: () => fetchPOI(poi.objectid),
  });

  if (isLoading) {
    return <div></div>;
  }

  const slide: SlideImage[] = data!.images_list.map<SlideImage>((image) => ({
    src: image,
    imageFit: "contain",
    title: `${data?.poitype_alias}: ${data?.poiname}`,
    description: `${data?.notes},\n ${data?.poicat_alias},\n ${data?.shape},\n ${data?.surveydate},\n ${data?.existing}`,
  }));

  return (
    <div style={{ width: "100%", aspectRatio: "3 / 2" }}>
      <Lightbox
        plugins={[Counter, Captions, Thumbnails, Share]}
        //TODO inline?
        open={open}
        close={() => close()}
        slides={slide}
        counter={{
          separator: "/",
          container: { className: "counter" },
        }}
        captions={{
          descriptionMaxLines: 10,
          descriptionTextAlign: "start",
        }}
        thumbnails={{
          width: 100,
          height: 100,
          position: "end",
        }}
      />
    </div>
  );
}

export default POIDetail;
