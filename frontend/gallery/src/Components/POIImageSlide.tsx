import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Share from "yet-another-react-lightbox/plugins/share";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "./poidetails.css";
import { useNavigate } from "react-router";

type ImageSlide = {
  images_list: string[];
};

function POIImageSlide({ images_list }: ImageSlide) {
  const navigate = useNavigate();
  const slide: SlideImage[] = images_list.map<SlideImage>((image) => ({
    src: image,
    imageFit: "contain",
  }));

  return (
    <Lightbox
      plugins={[Counter, Thumbnails, Share, Inline]}
      open={true}
      close={() => navigate(-1)}
      slides={slide}
      inline={{
        style: {
          width: "60%",
          height: "100vh",
          aspectRatio: "16/9",
        },
      }}
      counter={{
        separator: "/",
        container: { className: "counter" },
      }}
      thumbnails={{
        width: 100,
        height: 100,
        position: "bottom",
      }}
    />
  );
}

export default POIImageSlide;
