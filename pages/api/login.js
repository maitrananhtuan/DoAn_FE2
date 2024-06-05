// pages/api/login.js

import mysql from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Khởi tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'be1'
});

// Hàm để xác thực thông tin đăng nhập của người dùng
async function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    // Truy vấn để lấy thông tin người dùng từ cơ sở dữ liệu
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length === 0) {
        return reject(new Error('Người dùng không tồn tại'));
      }

      const user = results[0];

      // So sánh mật khẩu
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
        if (!isMatch) {
          return reject(new Error('Mật khẩu không đúng'));
        }

        // Tạo JWT token
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, 'your_jwt_secret', { expiresIn: '1h' });

        resolve({ user, token });
      });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    const { user, token } = await authenticateUser(email, password);
    return res.status(200).json({ message: 'Đăng nhập thành công', user, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
