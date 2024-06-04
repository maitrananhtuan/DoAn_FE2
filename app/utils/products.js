// utils/products.js

import mysql from 'mysql'; // Import thư viện MySQL

// Khởi tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'be1'
});

// Hàm để lấy tất cả sản phẩm từ cơ sở dữ liệu
export function getAllProducts() {
  return new Promise((resolve, reject) => {
    // Truy vấn tất cả sản phẩm từ bảng products trong cơ sở dữ liệu
    connection.query('SELECT * FROM products', (error, results) => {
      if (error) {
        reject(error); // Trả về lỗi nếu có lỗi trong quá trình truy vấn
      } else {
        resolve(results); // Trả về kết quả nếu truy vấn thành công
      }
    });
  });
}
