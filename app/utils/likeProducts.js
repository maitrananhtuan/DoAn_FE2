// viewProducts.js

import mysql from 'mysql';

// Khởi tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'be1'
});

// Hàm để tăng số lượng view của sản phẩm trong cơ sở dữ liệu
export function increaseLikeCount(productId) {
  return new Promise((resolve, reject) => {
    // Truy vấn để tăng số lượng view của sản phẩm có id là productId
    connection.query('UPDATE products SET likes = likes + 1 WHERE id = ?', [productId], (error, results) => {
      if (error) {
        reject(error); // Trả về lỗi nếu có lỗi trong quá trình truy vấn
      } else {
        resolve(results); // Trả về kết quả nếu truy vấn thành công
      }
    });
  });
}