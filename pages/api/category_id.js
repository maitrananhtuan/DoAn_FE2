// app/pages/api/category_id.js

// Import các module cần thiết
import { getProductsByCategory } from '../../app/utils/category_id';

// Xử lý yêu cầu
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Trích xuất categoryId từ query params hoặc body của request
            const categoryId = req.query.categoryId; // hoặc req.body.categoryId tùy vào cách bạn truyền dữ liệu
            // Gọi hàm getProductsByCategory với categoryId
            const products = await getProductsByCategory(categoryId);
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