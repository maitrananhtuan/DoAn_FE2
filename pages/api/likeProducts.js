// app/pages/api/likeProducts.js

// Import các module cần thiết
import { increaseLikeCount } from '../../app/utils/likeProducts';

// Xử lý yêu cầu
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Lấy productId từ body của yêu cầu
        const { productId } = req.body;
        // Gọi hàm increaseViewCount để tăng số lượng view của sản phẩm có productId
        await increaseLikeCount(productId);
        // Trả về kết quả thành công
        res.status(200).json({ message: 'Successfully updated view count' });
      } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Nếu phương thức yêu cầu không được hỗ trợ, trả về mã lỗi phù hợp
      res.status(405).end();
    }
}