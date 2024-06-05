
"use client";

import React, { useState, useEffect } from "react";
import styles from "../css/app.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("Trang chủ");
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isScrolledUp = prevScrollPos > currentScrollPos;
    setIsVisible(isScrolledUp);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div id="wrapper" className={`${styles["navbar-wrapper"]} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles["header"]}>
        <nav className={styles["container"]}>
          <a className={styles["logo"]} href="#">
            TechZone
          </a>
          <ul className={styles["main-menu"]}>
            <li>
              <a 
                href="/"
                className={activeItem === "Trang chủ" ? styles.active : ""}
                onClick={() => setActiveItem("Trang chủ")}
              >
                Trang chủ
              </a>
            </li>
            <li>
  <a 
    href="/introduce"
    className={activeItem === "Giới thiệu" ? styles.active : ""}
    onClick={() => setActiveItem("Giới thiệu")}
  >
    Giới thiệu
  </a>
</li>

            <li>
              <a href="/product">Sản phẩm &#9660;</a>
              <ul className={styles["sub-menu"]}>
                <li>
                  <a 
                    href="#"
                    className={activeItem === "Sam Sung" ? styles.active : ""}
                    onClick={() => setActiveItem("Sam Sung")}
                  >
                    Sam Sung
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className={activeItem === "Iphone" ? styles.active : ""}
                    onClick={() => setActiveItem("Iphone")}
                  >
                    Iphone
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className={activeItem === "Redmi" ? styles.active : ""}
                    onClick={() => setActiveItem("Redmi")}
                  >
                    Redmi
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className={activeItem === "ROG Phone" ? styles.active : ""}
                    onClick={() => setActiveItem("ROG Phone")}
                  >
                    ROG Phone
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a 
                href="/contact"
                className={activeItem === "Liên hệ" ? styles.active : ""}
                onClick={() => setActiveItem("Liên hệ")}
              >
                Liên hệ
              </a>
            </li>
          </ul>
          <ul className={styles["main-menu"]}>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faShoppingCart} /> 0
              </a>
            </li>
            <li>
              <a href="#">Đăng nhập</a>
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