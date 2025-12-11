// file: routes/categoryRouter.js (ĐÃ SỬA LỖI)

var express = require('express');
var router = express.Router();
// ⭐ SỬA: Đổi tên biến import từ 'categoryRouter' sang 'Category'
var Category = require('../models/category'); 


// Thêm category
router.post('/', async (req, res) => {
    try {
        const { name, code } = req.body;

        const cate = await Category.create({ name, code }); // Dùng tên 'Category'
        res.json({ status: true, message: 'Thêm category thành công', category: cate });
    } catch (err) {
        console.error('ERROR POST /category:', err);
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
});

// Lấy danh sách category
router.get('/', async (req, res) => {
    try {
        const list = await Category.find(); // Dùng tên 'Category'
        // TRẢ VỀ DỮ LIỆU DƯỚI DẠNG MẢNG (Vì Android Model đã setup để hứng List)
        res.json(list); 
    } catch (err) {
        console.error('ERROR GET /category:', err);
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
});

module.exports = router;