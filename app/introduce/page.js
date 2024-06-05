// IntroductionPage.js

"use client";

import React, { useState } from 'react';
import styles from '../css/introduction.module.css';
import NavBar from '@/app/views/NavBar';
import FooterProduct from '@/app/views/Footer';

const IntroductionPage = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredProduct(index);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Welcome to TechZone</h1>
          <p>Your ultimate destination for smartphones and laptops</p>
        </header>

        <section className={styles.bodyabout}>
          <div className={styles["containerabout"]}>
            <div className={styles["box"]}>
              <div className={styles["imgBx"]}>
                <img src="../image/aboutus.jpg"/>
              </div>
              <div className={styles["content"]}>
                <div>
                  <h2>Easy to shoping</h2>
                  <p>Shop with ease
                  </p>
                </div>
              </div>
            </div>
            <div className={styles["box"]}>
              <div className={styles["imgBx"]}>
                <img src="../image/aboutus1.jpg"/>
              </div>
              <div className={styles["content"]}>
                <div>
                  <h2>Airy</h2>
                  <p>The airy space helps users easily find products
                  </p>
                </div>
              </div>
            </div>
            <div className={styles["box"]}>
              <div className={styles["imgBx"]}>
                <img src="../image/aboutus2.jpg"/>
              </div>
              <div className={styles["content"]}>
                <div>
                  <h2>shop system</h2>
                  <p>Nationwide store system
                  </p>
                </div>
              </div>
            </div>
            <div className={styles["box"]}>
              <div className={styles["imgBx"]}>
                <img src="../image/aboutus3.jpg"/>
              </div>
              <div className={styles["content"]}>
                <div>
                  <h2>Authority</h2>
                  <p>Special authorization for genuine products from Apple
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <p>
            TechZone is more than just an electronics store; its a community of
            tech enthusiasts passionate about bringing the latest gadgets to your
            fingertips. Our team of experts handpicks each product, ensuring that
            only the best devices make it to our shelves.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Choose Us</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <img
                src="../image/delivery.jpg"
                alt="Fast Delivery"
                className={styles.featureIcon}
              />
              <h1>Fast Delivery</h1>
              <p>Get your new device delivered to your doorstep in no time.</p>
            </div>
            <div className={styles.feature}>
              <img
                src="../image/qualityProduct.jpg"
                alt="Quality Products"
                className={styles.featureIcon}
              />
              <h3>Quality Products</h3>
              <p>
                We only offer top-of-the-line smartphones and laptops from trusted
                brands.
              </p>
            </div>
            <div className={styles.feature}>
              <img
                src="../image/247.jpg"
                alt="Customer Support"
                className={styles.featureIcon}
              />
              <h3>24/7 Customer Support</h3>
              <p>
                Have questions? Our support team is available around the clock to
                assist you.
              </p>
            </div>
            <div className={styles.feature}>
              <img
                src="../image/pay.jpg"
                alt="Secure Payment"
                className={styles.featureIcon}
              />
              <h3>Secure Payment</h3>
              <p>
                Shop with confidence knowing that your transactions are safe and
                secure.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming Products</h2>
          <div className={styles.products}>
            {[
              { id: 1, name: 'Iphone 15 Promax', price: '35.600.000', img: '../image/iphone15prm.jpeg' },
              { id: 2, name: 'MacbookPro M4 2024', price: '65.999.000', img: '../image/2133051319031_1.jpg' },
              { id: 3, name: 'Apple Watch S.9', price: '10.900.000', img: '../image/apple-watch-series-9.png' },
            ].map((product, index) => (
              <div
                key={product.id}
                className={`${styles.product} ${hoveredProduct === index ? styles.productHover : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className={`${styles.productImage} ${hoveredProduct === index ? styles.productImageHover : ''}`}
                />
                <div className={styles.productDetails}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <a href='/product'><button className={styles.viewAllButton}>View All Products</button></a>
          {/* <button className={styles.viewAllButton}>View All Products</button> */}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <blockquote>
                TechZone offers a fantastic selection of products and their
                customer service is second to none. Highly recommended!
              </blockquote>
              <p>- John Doe, satisfied customer</p>
            </div>
            <div className={styles.testimonial}>
              <blockquote>
                The quality of the products is amazing. I love shopping at
                TechZone!
              </blockquote>
              <p>- Jane Smith, happy customer</p>
            </div>
          </div>
        </section>
      </div>
      <FooterProduct />
    </div>
  );
};

export default IntroductionPage;