"use client";
import React, { useState, useEffect } from "react";
import styles from "../css/app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import jwt from "jsonwebtoken";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái để kiểm soát hiển thị dropdown
  const [userName, setUserName] = useState("");
  const [icon, setIcon] = useState(faCaretUp); // Ban đầu là biểu tượng đi lên
  const [cartItemCount, setCartItemCount] = useState(0); // Biến state để lưu số lượng sản phẩm trong giỏ hàng

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Đã đăng nhập nếu có token
      const decodedToken = jwt.decode(token);
      console.log(decodedToken);
      setUserName(decodedToken.name); // Trích xuất tên người dùng từ token và cập nhật trạng thái
    }
    setCartItemCount(localStorage.getItem('cartCount'))
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName(""); // Đặt lại tên người dùng khi đăng xuất
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setIcon(showDropdown ? faCaretUp : faCaretDown); // Thay đổi biểu tượng khi bấm
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
          {isLoggedIn ? (
            <div className="relative inline-block text-left mt-3 mb-2">
              <div className="flex items-center"><button onClick={handleToggleDropdown} className="flex items-center border border-gray-400 rounded-md px-3 py-2 text-white-700 relative" aria-haspopup="true">
                <FontAwesomeIcon icon={faUser} size="lg" />
                <span className="ml-2">{userName}</span>
                <FontAwesomeIcon icon={icon} size="lg" className="ml-2" />
              </button>
                <a href="/cart"><FontAwesomeIcon icon={faShoppingCart} size="lg" className="ml-2" /></a>
                <span className="item-count">{cartItemCount}</span>
              </div>


              {showDropdown && (
                <div className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mt-3">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Thông tin cá nhân</a>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100" role="menuitem">Đăng xuất</button>
                  </div>
                </div>
              )}

            </div>

          ) : (
            <ul className={styles["main-menu"]}>
              <li>
                <a href="/login">Đăng nhập</a>
              </li>
              <li>
                <a href="/register">Đăng ký</a>
              </li>
            </ul>
          )}

        </nav>
      </div>
    </div>
  );
};

export default NavBar;