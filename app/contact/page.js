// Trong file ContactPage.js

import React from 'react';
import styles from "../css/contact.module.css";
import NavBar from '@/app/views/NavBar';
import FooterProduct from '@/app/views/Footer';

const ContactPage = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.contactInfo}>

          <ul className={styles.contact}>
            <li className={styles.contactChil}>Add: 39 Nguyen Hue st., HCM city</li>
            <li className={styles.contactChil}>Email: smart@mail.com</li>
            <li className={styles.contactChil}>Phone: 0123 456 789</li>
            <li className={styles.contactChil}>Fax: +84 123456789</li>
          </ul>
          
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
          <button className={styles.buttonSend} type="submit">Gửi</button>
        </form>
      </div>
      <FooterProduct />
    </div>
  );
}

export default ContactPage;
