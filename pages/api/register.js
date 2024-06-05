// pages/api/register.js

import mysql from 'mysql';
import bcrypt from 'bcrypt';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'be1'
});

async function registerUser(name, email, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return reject(err);
      }

      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      connection.query(query, [name, email, hashedPassword], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    const results = await registerUser(name, email, password);
    return res.status(200).json({ message: 'Đăng ký thành công', results });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }
    return res.status(500).json({ message: 'Lỗi server', error });
  }
}
