// routes/cartRouter.js
var express = require('express');
var router = express.Router();

var CartItem = require('../models/cartItem');

// Lấy giỏ hàng
router.get('/:userID', async (req, res) => {
    try {
        const list = await CartItem.find({ userID: req.params.userID });
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
});

// Thêm vào giỏ
router.post('/add', async (req, res) => {
    try {
        const { userID, productID, productName, price, quantity } = req.body;

        console.log('Body nhận được:', req.body);

        let item = await CartItem.findOne({ userID, productID });

        if (item) {
            item.quantity += Number(quantity) || 1;
            await item.save();
        } else {
            item = await CartItem.create({
                userID,
                productID,
                productName, 
                price,
                quantity: Number(quantity) || 1
            });
        }

        res.json({ message: "Cập nhật giỏ hàng", item });
    } catch (err) {
        console.error('ERROR /cart/add:', err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
});

module.exports = router;


