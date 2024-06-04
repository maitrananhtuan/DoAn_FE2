// Trong file ContactPage.js

import React from 'react';
import styles from "../../css/contact.module.css";
import NavBar from '@/app/views/NavBar';
import FooterProduct from '@/app/views/Footer';

const ContactPage = () => {
  return (
    <div>
      <NavBar/>
      <div className={styles.container}>
      <div className={styles.contactInfo}>
        <div className={styles.contactInfoItem}>
          <p>Địa chỉ: Số 123, Đường ABC, Thành phố XYZ</p>
        </div>
        <div className={styles.contactInfoItem}>
          <p>Email: example@example.com</p>
        </div>
        <div className={styles.contactInfoItem}>
          <p>Điện thoại: 0123 456 789</p>
        </div>
      </div>
      <form className={styles.contactForm}>
        <h2>Gửi tin nhắn cho chúng tôi</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Họ và tên:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Tin nhắn:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Gửi</button>
      </form>
    </div>
    <FooterProduct/>
    </div>
  );
}

export default ContactPage;
