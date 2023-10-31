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

type ImageSlide = {
  images_list: string[];
};

function POIImageSlide({ images_list }: ImageSlide) {
  const slide: SlideImage[] = images_list.map<SlideImage>((image) => ({
    src: image,
    imageFit: "contain",
    // title: `${data?.poitype_alias}: ${data?.poiname}`,
    // description: `${data?.notes},\n ${data?.poicat_alias},\n ${data?.shape},\n ${data?.surveydate},\n ${data?.existing}`,
  }));

  return (
    <Lightbox
      plugins={[Counter, Captions, Thumbnails, Share, Inline]}
      //TODO inline?
      open={true}
      // close={() => navigate(-1)}
      slides={slide}
      inline={{
        style: { width: "64%", height: "100vh", aspectRatio: "16/9" },
      }}
      counter={{
        separator: "/",
        container: { className: "counter" },
      }}
      // captions={{
      //   descriptionMaxLines: 10,
      //   descriptionTextAlign: "start",
      // }}
      thumbnails={{
        width: 100,
        height: 100,
        position: "bottom",
      }}
    />
  );
}

export default POIImageSlide;
