import { POI } from "../Types/PoiTypes";
import { Link } from "react-router-dom";
import styles from "./POICard.module.css";
import { useState, useRef, useEffect } from "react";

type POICardProps = {
  poi: POI;
};

function POICard({ poi }: POICardProps) {
  console.log(poi.id);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "150px",
      }
    );

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.disconnect();
      }
    };
  }, []);
  return (
    <div
      className={styles.column}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/poigallery/poi/${poi.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
      >
        <div className={styles.smallCard}>
          {loaded ? (
            <img
              ref={imgRef}
              className={styles.cardImage}
              src={poi.tbn}
              alt={poi.notes || "POI Image"}
              loading="lazy"
            />
          ) : (
            <div ref={imgRef}></div>
          )}
          {isHovered && (
            <div className={styles.cardText}>
              <h4>{poi.pc_a}</h4>
              <h6>{poi.pt_a}</h6>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default POICard;
