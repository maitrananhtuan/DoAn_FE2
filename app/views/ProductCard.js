"use client";

import { useEffect, useRef } from "react";
import styles from "../css/app.module.css";
import useIntersectionObserver from "../hooks/scroll";
import React, { useState } from "react";
import axios from 'axios';

const ProductCard = () => {

  // CSDL
  useEffect(() => {
    // Gọi API endpoint /api/products khi component được mount
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // animation scroll
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  // Modal
  const [isLoading, setIsLoading] = useState(false); // State để quản lý hiệu ứng loading
  const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý modal

  const handleProductClick = () => {
    // Khi người dùng click vào sản phẩm
    setIsLoading(true); // Hiển thị hiệu ứng loading

    // Sau 1 giây, ẩn hiệu ứng loading và mở modal
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
    }, 1000);
  };

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
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.classList.add(styles.visible);
          }
        },
        { threshold: 0.1 }
      );

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

  // Fetch product data
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_all_products.php');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Sản phẩm đề xuất */}
      <div className={styles["product-recommend-wrapper"]}>
        <div className={styles["product-recommend"]}>
          <h2>Sản phẩm đề xuất</h2>
          <div className={styles["main-card"]} ref={mainCardRef}>
            {/* Thêm các thẻ div cho từng sản phẩm */}
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
                  {/* <p className={styles["details"]}>{product.description}</p> */}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Sản phẩm */}
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
                  onClick={handleProductClick}
                >
                  <img
                    src={`/image/${product.image}`}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p className={styles["price"]}>{product.price}</p>
                  {/* <p className={styles["details"]}>{product.description}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div>
        {/* Hiệu ứng loading */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-800"></div>
          <div className="absolute text-white text-xl">Loading...</div>
        </div>
      </div>
      )}
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full max-w-4xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Modal title
                    </h3>
                    <hr className="my-2 border-b-2 border-gray-300" />
                    <div className="flex items-center sm:flex-row sm:items-start sm:justify-start">
                      <div className="sm:mr-4">
                        {/* <!-- Hình ảnh sản phẩm --> */}
                        <img
                          src="../image/samsung-galaxy-m42-600x600-600x600.jpg"
                          alt="Product 3"
                          style={{ minWidth: "300px", height: "auto" }}
                        />
                      </div>
                      <div className="mt-2 sm:mt-0 sm:flex-grow">
                        {/* <!-- Tên sản phẩm --> */}
                        <h3 className="text-lg font-semibold text-gray-900">
                          Product 3
                        </h3>
                        {/* <!-- Giá sản phẩm --> */}
                        <p className="text-gray-500 text-sm">$300</p>
                        {/* <!-- Nội dung chi tiết sản phẩm --> */}
                        <p className="text-gray-700 h-full overflow-auto h-64">
                          This is the detail of product 3. It has excellent
                          reviews. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. It has excellent reviews. Lorem ipsum
                          dolor sit amet, consectetur adipiscing elit. It has
                          excellent reviews. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.It has excellent reviews.
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.It has excellent reviews. Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save changes
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
