"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../css/app.module.css";
import useIntersectionObserver from "../hooks/scroll";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

function stripHtmlTags(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);

  const MainCard = styled.div`
  transition: transform 0.5s ease;
  transform: translateY(${props => (props.isModalOpen ? '-100%' : '0')});
  visibility: ${props => (props.isModalOpen ? 'hidden' : 'visible')};
  opacity: ${props => (props.isModalOpen ? '0' : '1')};
`;

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setIsLoading(true); // Hiệu ứng loading

    setTimeout(() => {
      setIsLoading(false);
      setSelectedProduct(product);
      setIsModalOpen(true);
    }, 1000);
  };

  // tăng view
  const handleViewClick = async (productId) => {
    try {
      const response = await axios.post("/api/viewProducts", { productId });
      console.log("Response from server:", response.data);
      // Nếu kết nối thành công với endpoint API và tăng số lượng view thành công, bạn có thể thực hiện các thao tác tiếp theo ở đây
      // Ví dụ: cập nhật giao diện người dùng để hiển thị số lượng view mới
      const updatedProducts = products.map((product) =>
        product.id === productId
          ? { ...product, views: product.views + 1 }
          : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error increasing view count:", error);
      // Xử lý lỗi nếu gặp phải
    }
  };

  // Load liked products from localStorage on component mount
  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
  }, []);

  // tăng like
  const handleLikeClick = async (productId) => {
    try {
      // Kiểm tra xem sản phẩm đã được like trước đó chưa
      if (!likedProducts.includes(productId)) {
        // Nếu sản phẩm chưa được like, thực hiện tăng số lượng like và cập nhật trạng thái đã like
        const response = await axios.post("/api/likeProducts", { productId });
        console.log("Response from server:", response.data);

        // Tăng số lượng like
        const updatedProducts = products.map((product) =>
          product.id === productId ? { ...product, likes: product.likes + 1 } : product
        );
        setProducts(updatedProducts);

        // Cập nhật trạng thái đã like của sản phẩm
        setLikedProducts([...likedProducts, productId]);

        // Lưu danh sách các sản phẩm đã được like vào localStorage
        localStorage.setItem("likedProducts", JSON.stringify([...likedProducts, productId]));
      }
    } catch (error) {
      console.error("Error increasing view count:", error);
      // Xử lý lỗi nếu gặp phải
    }
  };

  // Chuyển tự động các card
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

  return (
    <div>
      {/* Sản phẩm đề xuất */}
      <div className={styles["product-recommend-wrapper"]}>
        <div className={styles["product-recommend"]}>
          <h2>Sản phẩm đề xuất</h2>
          <div className={styles["main-card"]} ref={mainCardRef}>
            {products.map((product) => (
              <div key={product.id} className={`${styles.card} `}>
                <img src={`/image/${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p className={styles["price"]}>{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Danh sách sản phẩm */}

      <MainCard isModalOpen={isModalOpen}>
        <div className={styles["productRecommendWrapper"]}>
          <div className={styles["product-wrapper"]}>
            <div className={styles["product"]}>
              <h2>Sản phẩm</h2>
              <div className={styles["main-card"]}>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`${styles.card} `}
                    
                  >
                    <img src={`/image/${product.image}`} alt={product.name} 
                    onClick={() => {
                      handleProductClick(product);
                      handleViewClick(product.id);
                    }}/>
                    <h3>{product.name}</h3>
                    <p className={styles["price"]}>{product.price}</p>
                    <div className={styles.icons}>
                      <span className={styles.viewIcon}>
                        <FontAwesomeIcon icon={faEye} />
                        {product.views}
                      </span>

                      <span className={styles.likeIcon}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn chặn sự kiện click lan sang phần tử cha
                            handleLikeClick(product.id);
                          }}
                          style={{ color: likedProducts.includes(product.id) ? 'red' : 'black' }}
                        />
                        {product.likes}
                      </span>

                    </div>
                    <div className={styles.buttons}>
                      <span>
                        <a className={styles["button-buy"]}>Buy</a>
                      </span>
                    </div>
                    <div className={styles.addtocart}>
                      <span>
                        <button class={styles["purchase-button"]} data-content="Add to cart">Add to cart</button>
                        {/* <a className={styles["button-buy"]}>Add to cart</a> */}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainCard>
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full max-w-4xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {selectedProduct ? selectedProduct.name : ""}
                    </h3>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-transparent border-0 p-0 leading-none text-black opacity-50 cursor-pointer focus:outline-none" data-bs-dismiss="modal" aria-label="Close">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <hr className="my-2 border-b-2 border-gray-300" />
                  <div className="flex items-center sm:flex-row sm:items-start sm:justify-start">
                    <div className="sm:mr-4">
                      <img
                        src={`/image/${selectedProduct.image}`}
                        alt={selectedProduct.name}
                        style={{ minWidth: "300px", height: "auto" }}
                      />
                    </div>
                    <div className="mt-2 sm:mt-0 sm:flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedProduct.price}
                      </h3>
                      <p className="text-gray-700 h-full overflow-auto h-64">
                        {stripHtmlTags(selectedProduct.description)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
