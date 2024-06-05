// login.js

import mysql from 'mysql';

// Khởi tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'be1'
});

// Hàm đăng nhập tài khoản
export async function loginUser(email, password) {
  try {
    // Kiểm tra xem email và mật khẩu có đúng không
    const user = await connection.query('SELECT * FROM users WHERE email =? AND password =?', [email, password]);
    if (user.length === 0) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }

    // Trả về thông tin tài khoản nếu đăng nhập thành công
    return user[0];
  } catch (error) {
    if (error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}