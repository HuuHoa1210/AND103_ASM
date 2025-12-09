var express = require('express');
var router = express.Router();
var Product = require('../models/product'); // Sửa lại tên biến cho chuẩn

// Hàm xử lý lấy danh sách (Dùng chung cho /, /all, /search)
const getProducts = async (req, res) => {
    try {
        const { cateID, name } = req.query;
        let filter = {};

        if (cateID) filter.cateID = cateID;
        if (name) filter.name = { $regex: name, $options: 'i' };

        const list = await Product.find(filter).populate('cateID');
        
        // Trả về đúng cấu trúc ProductResponse bên Android
        res.json({
            status: true,
            message: "Lấy danh sách thành công",
            data: list
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
};

// 1. API: /product/ (Mặc định)
router.get('/', getProducts);

// 2. API: /product/all (Khớp với Android: apiService.getListProducts)
router.get('/all', getProducts);

// 3. API: /product/search (Khớp với Android: apiService.searchProduct)
router.get('/search', getProducts);

// 4. API: Thêm sản phẩm
router.post('/', async (req, res) => {
    try {
        const { name, description, price, quantity, status, cateID, image } = req.body;
        const product = await Product.create({ name, description, price, quantity, status, cateID, image });
        res.json({ status: true, message: 'Thêm sản phẩm thành công', data: product });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
});

// 5. API: Chi tiết sản phẩm (/product/:id)
router.get('/:id', async (req, res) => {
    try {
        const p = await Product.findById(req.params.id).populate('cateID');
        if (!p) return res.status(404).json({ status: false, message: 'Không tìm thấy' });
        res.json(p); // Trả về object product trực tiếp (theo code Android cũ của bạn)
    } catch (err) {
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
});

module.exports = router;