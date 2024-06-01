"use client";

import React from 'react';
import styles from "../css/app.module.css";

const FooterProduct = () => {

    return (
        <div>
            <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.title}>Thông tin liên hệ</p>
                <p>Địa chỉ: Số 123, Đường ABC, Thành phố XYZ</p>
                <p>Email: example@example.com</p>
                <p>Điện thoại: 0123 456 789</p>
            </div>
            <div className={styles.footerContent}>
                <p className={styles.title}>Liên kết nhanh</p>
                <ul>
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="#">Sản phẩm</a></li>
                    <li><a href="#">Giới thiệu</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
            <div className={styles.footerContent}>
                <p className={styles.title}>Theo dõi chúng tôi</p>
                <ul className={styles.socialLinks}>
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                </ul>
            </div>
        </footer>
        </div>
    );
}

export default FooterProduct;