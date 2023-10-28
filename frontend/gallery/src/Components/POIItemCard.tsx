import { Card } from "antd";
import { POI } from "../Types/PoiTypes";
import { useState } from "react";
import POIDetail from "./POIDetail";

const { Meta } = Card;

type POIItemCardProps = {
  poi: POI;
};

function POIItemCard({ poi }: POIItemCardProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        <Card
          className="small-card"
          hoverable
          onClick={() => {
            setOpen((prevState) => !prevState);
          }}
          cover={<img className="card-image" src={poi.thumbnail} />}
        >
          <Meta className="card-text" title={poi.poiname} />
        </Card>
      }
      {open && <POIDetail open={open} close={handleClose} poi={poi} />}
    </>
  );
}

export default POIItemCard;
