// utils/category_id.js

import mysql from 'mysql'; // Import thư viện MySQL

// Khởi tạo kết nối đến cơ sở dữ liệu
// utils/category_id.js

// Khởi tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'be1'
});

// Hàm để lấy các sản phẩm thuộc một danh mục cụ thể
export function getProductsByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    // Truy vấn SQL để lấy danh sách các sản phẩm thuộc danh mục có id là categoryId
    const query = `
      SELECT p.*
      FROM products p
      INNER JOIN category_product cp ON p.id = cp.product_id
      INNER JOIN categories c ON cp.category_id = c.id
      WHERE c.id = ?
    `;
    connection.query(query, [categoryId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}