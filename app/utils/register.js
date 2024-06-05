// register.js

import mysql from 'mysql';

// Khởi tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'be1'
});

// Hàm đăng ký tài khoản mới
export async function registerUser(name, email, password) {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const emailExist = await connection.query('SELECT * FROM users WHERE email =?', [email]);
    if (emailExist.length > 0) {
      throw new Error('Email đã tồn tại');
    }

    // Thêm tài khoản mới vào cơ sở dữ liệu
    const result = await connection.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, password]);
    return result;
  } catch (error) {
    if (error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}