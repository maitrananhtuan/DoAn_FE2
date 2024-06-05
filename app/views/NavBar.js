
"use client";

import React, { useState, useEffect } from "react";
import styles from "../css/app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("Trang chủ");
  const [categories, setCategories] = useState([]);

  // Load danh mục khi component được render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(`/api/category_id?categoryId=${categoryId}`);
      console.log(response.data); // Hiển thị danh sách sản phẩm từ danh mục được chọn
      // Redirect đến trang hiển thị sản phẩm của danh mục
      window.location.href = `/category/${categoryId}`;
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };
  

  return (
    <div id="wrapper" className={`${styles["navbar-wrapper"]}`}>
      <div className={styles["header"]}>
        <nav className={styles["container"]}>
          <a className={styles["logo"]} href="/">
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
              {categories.map((category) => (
    <li key={category.id}>
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          handleCategoryClick(category.id);
        }}
      >
        {category.name}
      </a>
    </li>
  ))}
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
