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
      <NavBar/>
      <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to TechZone</h1>
        <p>Your ultimate destination for smartphones and laptops</p>
      </header>

      <img
        src="https://via.placeholder.com/1200x400"
        alt="Hero"
        className={styles.heroImage}
      />

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
              src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
              alt="Fast Delivery"
              className={styles.featureIcon}
            />
            <h3>Fast Delivery</h3>
            <p>Get your new device delivered to your doorstep in no time.</p>
          </div>
          <div className={styles.feature}>
            <img
              src="https://via.placeholder.com/80"
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
              src="https://via.placeholder.com/80"
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
              src="https://via.placeholder.com/80"
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
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.products}>
          {[
            { id: 1, name: 'Smartphone X', price: '$499', img: 'https://via.placeholder.com/250' },
            { id: 2, name: 'Laptop Y', price: '$899', img: 'https://via.placeholder.com/250' },
            { id: 3, name: 'Smartwatch Z', price: '$299', img: 'https://via.placeholder.com/250' },
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
        <button className={styles.viewAllButton}>View All Products</button>
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
    <FooterProduct/>
    </div>
  );
};

export default IntroductionPage;