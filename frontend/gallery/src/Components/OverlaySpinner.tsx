import "./overlay_spinner.css";

type OverlaySpinnerProps = {
  active: boolean | undefined;
};

export default function OverlaySpinner({ active }: OverlaySpinnerProps) {
  return (
    <div
      className={active ? "div-overlayspinner" : "div-overlayspinnerInvisible"}
    >
      <div className="spinner"></div>
    </div>
  );
}
