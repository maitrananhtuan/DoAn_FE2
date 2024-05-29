import styles from "../css/app.module.css";

const NavBar = () => {
  return (
    <div id="wrapper" className={styles["navbar-wrapper"]}>
      <div className={styles["header"]}>
        <nav className={styles["container"]}>
          <a className={styles["logo"]} href="#">
            SMART PHONE
          </a>
          <ul className={styles["main-menu"]}>
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="/product">Sản phẩm &#9660;</a>
              <ul className={styles["sub-menu"]}>
                <li>
                  <a href="#">Sam Sung</a>
                </li>
                <li>
                  <a href="#">Iphone</a>
                </li>
                <li>
                  <a href="#">Redmi</a>
                </li>
                <li>
                  <a href="#">ROG Phone</a>
                </li>
                <li>
                  <a href="#">ROG Phone</a>
                </li>
                <li>
                  <a href="#">ROG Phone</a>
                </li>
                <li>
                  <a href="#">ROG Phone</a>
                </li>
                <li>
                  <a href="#">ROG Phone</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
          <ul className={styles["main-menu"]}>
            <li>
              <a href="/auth/login">Đăng nhập</a>
            </li>
            <li>
              <a href="#">Đăng ký</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
