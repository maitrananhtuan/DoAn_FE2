// app/pages/api/products.js

// Import các module cần thiết
import { getAllProducts } from '../../app/utils/products'; // Đảm bảo đường dẫn đến module hoặc tệp 'getAllProducts' là chính xác

// Xử lý yêu cầu
export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Gọi hàm getAllProducts để lấy tất cả sản phẩm từ cơ sở dữ liệu
        const products = await getAllProducts();
  
        // Trả về kết quả dưới dạng JSON
        res.status(200).json(products);
      } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Nếu phương thức yêu cầu không được hỗ trợ, trả về mã lỗi phù hợp
      res.status(405).end();
    }
  }