// app/pages/api/category.js

// Import các module cần thiết
import { getAllCategories } from '../../app/utils/category'; // Đảm bảo đường dẫn và tên hàm là chính xác

// Xử lý yêu cầu
export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Gọi hàm getAllCategories để lấy tất cả các danh mục từ cơ sở dữ liệu
        const categories = await getAllCategories();
        // Trả về kết quả dưới dạng JSON
        res.status(200).json(categories);
      } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Nếu phương thức yêu cầu không được hỗ trợ, trả về mã lỗi phù hợp
      res.status(405).end();
    }
  }