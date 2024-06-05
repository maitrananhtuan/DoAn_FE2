"use client";

import { useState, useEffect } from "react";
import NavBar from "../views/NavBar";
import FooterProduct from "../views/Footer";
import styles from "../css/app.module.css";
import axios from "axios";
import useIntersectionObserver from "../hooks/scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Products() {
  // animation scroll
  // const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  const [products, setProducts] = useState([]);
  const [activeItem, setActiveItem] = useState("Trang chủ");

  useEffect(() => {
    // Gọi API endpoint /api/products khi component được mount
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <NavBar/>
      <div className={styles["productRecommendWrapper"]}>
        <div className={styles["product-wrapper"]}>
          <div className={styles["product"]}>
            <h2>Sản phẩm</h2>
            <div className={styles["main-card"]}>
              {/* Hiển thị danh sách sản phẩm */}
              {products.map(product => (
                <div
                  key={product.id}
                  className={`${styles.card} `}
                >
                  <img
                    src={`/image/${product.image}`}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p className={styles["price"]}>{product.price}</p>
                  <div className={styles.buttons}>
                    <span>
                      <a className={styles["button-buy"]}>Buy</a>
                    </span>
                  </div>
                  <div className={styles.addtocart}>
                    <span>
                      <button class={styles["purchase-button"]} data-content="Add to cart">Add to cart</button>
                      {/* <a className={styles["button-buy"]}>Add to cart</a> */}
                    </span>
                  </div>
                  {/* <p className={styles["details"]}>{product.description}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterProduct />
    </div>
  );
}
