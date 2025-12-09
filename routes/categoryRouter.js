var express = require('express');
var router = express.Router();
var categoryRouter = require('../models/category');


// Thêm category
router.post('/', async (req, res) => {
    try {
        const { name, code } = req.body;

        const cate = await Category.create({ name, code });
        res.json({ message: 'Thêm category thành công', category: cate });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

//Lấy danh sách category
router.get('/', async (req, res) => {
    try {
        const list = await Category.find();
        res.json(list);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
module.exports = router;