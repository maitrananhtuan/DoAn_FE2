// login.api.js

import { loginUser } from '../../app/utils/login';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Lấy thông tin đăng nhập từ body của yêu cầu
      const { email, password } = req.body;
      // Gọi hàm đăng nhập tài khoản
      const user = await loginUser(email, password);
      // Trả về kết quả thành công
      res.status(200).json({ message: 'Đăng nhập thành công', user });
    } catch (error) {
      // Nếu có lỗi xảy ra trong quá trình truy vấn, trả về lỗi 500 và thông báo lỗi
      res.status(500).json({ message: 'Lỗi nội bộ' });
    }
  } else {
    // Nếu phương thức yêu cầu không được hỗ trợ, trả về mã lỗi phù hợp
    res.status(405).end();
  }
}