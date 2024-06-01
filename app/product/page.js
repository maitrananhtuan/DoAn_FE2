"use client";

import styles from "../css/app.module.css";
import FooterProduct from "../views/Footer";
import useIntersectionObserver from "../hooks/scroll";

export default function Home() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div>
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
              </ul>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
          <ul className={styles["main-menu"]}>
            <li>
              <a href="#">Đăng nhập</a>
            </li>
            <li>
              <a href="#">Đăng ký</a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        ref={ref}
        className={`${styles.productRecommendWrapper} ${
          isIntersecting ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles["product-wrapper"]}>
          <div className={styles["product"]}>
            <h2>Sản phẩm</h2>
            <div className={styles["main-card"]}>
              {/* Thêm các thẻ div cho từng sản phẩm */}
              <div
                ref={ref}
                className={`${styles.card} ${
                  isIntersecting ? styles.visible : styles.hidden
                }`}
              >
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 1"
                />
                <h3>Product 1</h3>
                <p className={styles["price"]}>$100</p>
                <p className={styles["details"]}>
                  This is the detail of product 1. It has many features and
                  benefits.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 2"
                />
                <h3>Product 2</h3>
                <p className={styles["price"]}>$200</p>
                <p className={styles["details"]}>
                  This is the detail of product 2. It is very popular among
                  customers.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
              <div className={styles["card"]}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 3"
                />
                <h3>Product 3</h3>
                <p className={styles["price"]}>$300</p>
                <p className={styles["details"]}>
                  This is the detail of product 3. It has excellent reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterProduct />
    </div>
  );
}
