"use client";

import { useEffect, useRef } from "react";
import styles from "../css/app.module.css";
import useIntersectionObserver from "../hooks/scroll";

const ProductCard = () => {

  // animation scroll
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  // animation slideshow các card sản phẩm đề xuất
  const mainCardRef = useRef(null);

  useEffect(() => {
    const mainCard = mainCardRef.current;
    let isTransitioning = false;

    const transitionEndHandler = () => {
      isTransitioning = false;
      mainCard.appendChild(mainCard.firstElementChild);
      mainCard.style.transition = "none";
      mainCard.style.transform = "translateX(0)";
      setTimeout(() => {
        mainCard.style.transition = "transform 0.5s ease";
      });
    };

    const interval = setInterval(() => {
      if (!isTransitioning) {
        isTransitioning = true;
        mainCard.style.transition = "transform 0.5s ease-out";
        mainCard.style.transform = "translateX(-20%)";
      }
    }, 3000);

    mainCard.addEventListener("transitionend", transitionEndHandler);

    return () => {
      clearInterval(interval);
      mainCard.removeEventListener("transitionend", transitionEndHandler);
    };
  }, []);

  // animation sản phẩm

  const cardRefs = useRef([]);

  useEffect(() => {
    const refsArray = cardRefs.current;
    const observers = refsArray.map((ref) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          ref.classList.add(styles.visible);
        }
      }, { threshold: 0.1 });

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (refsArray[index]) {
          observer.unobserve(refsArray[index]);
        }
      });
    };
  }, []);

  return (
    <div>
      {/* Sản phẩm đề xuất */}
      <div className={styles["product-recommend-wrapper"]}>
        <div className={styles["product-recommend"]}>
          <h2>Sản phẩm đề xuất</h2>
          <div className={styles["main-card"]} ref={mainCardRef}>
            {/* Thêm các thẻ div cho từng sản phẩm */}
            <div className={styles["card"]}>
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
              <p className={styles["price"]}>$100</p>
              <p className={styles["details"]}>
                This is the detail of product 1. It has many features and
                benefits.
              </p>
            </div>
            <div className={styles["card"]}>
              <img
                src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                alt="Product 3"
              />
              <h3>
                <a href="#">Product 3</a>
              </h3>
              <p className={styles["price"]}>$200</p>
              <p className={styles["details"]}>
                This is the detail of product 2. It is very popular among
                customers.
              </p>
            </div>
            <div className={styles["card"]}>
              <img
                src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                alt="Product 4"
              />
              <h3>Product 4</h3>
              <p className={styles["price"]}>$300</p>
              <p className={styles["details"]}>
                This is the detail of product 3. It has excellent reviews.
              </p>
            </div>
            <div className={styles["card"]}>
              <img
                src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                alt="Product 5"
              />
              <h3>Product 5</h3>
              <p className={styles["price"]}>$300</p>
              <p className={styles["details"]}>
                This is the detail of product 3. It has excellent reviews.
              </p>
            </div>
            <div className={styles["card"]}>
              <img
                src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                alt="Product 6"
              />
              <h3>Product 6</h3>
              <p className={styles["price"]}>$300</p>
              <p className={styles["details"]}>
                This is the detail of product 3. It has excellent reviews.
              </p>
            </div>
            <div className={styles["card"]}>
              <img
                src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                alt="Product 6"
              />
              <h3>Product 7</h3>
              <p className={styles["price"]}>$300</p>
              <p className={styles["details"]}>
                This is the detail of product 3. It has excellent reviews.
              </p>
            </div>
            <div className={styles["card"]}>
              <img
                src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                alt="Product 6"
              />
              <h3>Product 8</h3>
              <p className={styles["price"]}>$300</p>
              <p className={styles["details"]}>
                This is the detail of product 3. It has excellent reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Sản phẩm */}
      <div ref={ref}
      className={`${styles.productRecommendWrapper} ${
        isIntersecting ? styles.visible : styles.hidden
      }`}>
        <div className={styles["product-wrapper"]}>
          <div className={styles["product"]}>
            <h2>Sản phẩm</h2>
            <div className={styles["main-card"]}>
              {/* Thêm các thẻ div cho từng sản phẩm */}
              <div ref={ref}
      className={`${styles.card} ${
        isIntersecting ? styles.visible : styles.hidden
      }`}>
                <img
                  src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                  alt="Product 1"
                />
                <h3>Product 1</h3>
                <p className={styles["price"]}></p>
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
    </div>
  );
};

export default ProductCard;
