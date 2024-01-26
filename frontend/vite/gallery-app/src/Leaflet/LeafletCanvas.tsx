import { typeToImageUrl } from "./marker_icons";
import L from "leaflet";
type mapPOI = {
  o: number;
  poitype: string;
  coordinates: number[];
};

export class CanvasLayer extends L.Layer {
  private _pois: mapPOI[];
  // private _map!: L.Map;
  private _canvas: HTMLCanvasElement | undefined;
  private _ctx: CanvasRenderingContext2D | undefined;

  constructor(pois: mapPOI[], map: L.Map) {
    super();
    this._pois = pois;
    this._map = map;
  }

  onAdd(map: L.Map): this {
    this._map = map;
    this._canvas = L.DomUtil.create(
      "canvas",
      "leaflet-zoom-animated"
    ) as HTMLCanvasElement;
    const size = map.getSize();
    this._canvas.width = size.x;
    this._canvas.height = size.y;
    this._ctx = this._canvas.getContext("2d")!;
    this._canvas.addEventListener("click", this._onCanvasClick.bind(this));
    (map as any)._panes.overlayPane.appendChild(this._canvas);
    map.on("zoomstart", this._clearCanvas, this);
    map.on("moveend", this._update, this);
    this._update();
    return this;
  }

  onRemove(map: L.Map): this {
    L.DomUtil.remove(this._canvas!);
    map.off("moveend", this._update, this);
    map.off("zoomstart", this._clearCanvas, this);
    return this;
  }
  getCount(): number {
    return this._pois.length;
  }

  private _clearCanvas(): void {
    if (this._ctx) {
      const size = this._map.getSize();
      this._ctx.clearRect(0, 0, size.x, size.y);
    }
  }
  private _loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }
  private _onCanvasClick(event: MouseEvent): void {
    const rect = this._canvas!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (const poi of this._pois) {
      const point = this._map.latLngToContainerPoint(
        L.latLng([poi.coordinates[0], poi.coordinates[1]])
      );
      if (this._isPointNearMarker(x, y, point)) {
        this._showPopup(poi);
        break;
      }
    }
  }
  private _isPointNearMarker(
    x: number,
    y: number,
    markerPoint: L.Point
  ): boolean {
    const clickThreshold = 10;
    return (
      Math.abs(x - markerPoint.x) < clickThreshold &&
      Math.abs(y - markerPoint.y) < clickThreshold
    );
  }

  private async _showPopup(poi: mapPOI): Promise<void> {
    const { createPopUp } = await import("./leafletlayer_utils");
    const popupContainer = await createPopUp({ view: this._map, point: poi });
    L.popup({ offset: L.point(0, -22) })
      .setLatLng([poi.coordinates[0], poi.coordinates[1]])
      .setContent(popupContainer)
      .openOn(this._map);
  }

  private _update(): void {
    if (!this._map || !this._ctx) return;
    const topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._canvas!, topLeft);
    const size = this._map.getSize();
    const bounds = this._map.getBounds();
    this._ctx.clearRect(0, 0, size.x, size.y);

    this._pois.forEach((poi) => {
      if (bounds.contains(L.latLng([poi.coordinates[0], poi.coordinates[1]]))) {
        const point = this._map.latLngToContainerPoint(
          L.latLng([poi.coordinates[0], poi.coordinates[1]])
        );
        this._drawMarker(point, poi);
      }
    });
  }

  private async _drawMarker(point: L.Point, poi: mapPOI): Promise<void> {
    if (!this._ctx) return;

    const imageUrl = typeToImageUrl[poi.poitype];

    const image = await this._loadImage(imageUrl);
    const imageSize = 30;
    this._ctx.drawImage(
      image,
      point.x - imageSize / 2,
      point.y - imageSize,
      imageSize,
      imageSize
    );
  }
}
