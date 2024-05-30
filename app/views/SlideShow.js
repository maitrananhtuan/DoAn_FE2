import styles from "../css/app.module.css";

const SlideShow = () => {
  return (
    <div>
      <div className={styles["main-slideshow"]}>
        <div className={styles["slideshow"]}>
          <div className={styles["image-slideshow"]}>
            <img src="../image/500K-1200x630-1-scaled.jpg"></img>
          </div>
          <div className={styles["image-slideshow"]}>
            <img src="../image/FINAL-1_1200x630.jpg"></img>
          </div>
          <div className={styles["image-slideshow"]}>
            <img src="../image/THANG-XIAOMI_1200x630-scaled.jpg"></img>
          </div>
          <div className={styles["image-slideshow"]}>
            <img src="../image/cdgfg_1200x630-1536x1009.jpg"></img>
          </div>
          <div className={styles["image-slideshow"]}>
            <img src="../image/TCDM-SAMSUNG_1200x628.jpeg"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
