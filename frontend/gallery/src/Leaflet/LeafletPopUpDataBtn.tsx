type ChangeViewPopUpProps = {
  active: boolean;
};

function LeafletPopUpDataBtn() {
  return (
    <div>
      <button
        // className={active ? styles.btnViewChangeActive : styles.btnViewChange}
        id="galleryView"
        style={{ cursor: "pointer" }}
      >
        {/* {active ? (
          <>
            <span>Galéria</span>
          </>
        ) : null} */}
      </button>
    </div>
  );
}

export default LeafletPopUpDataBtn;
