var express = require('express');
var router = express.Router();

var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');   // nếu file là orderDetail.js thì require đúng tên
var CartItem = require('../models/cartItem');

// ================== ĐẶT HÀNG TỪ GIỎ ==================
router.post('/create', async (req, res) => {
    try {
        console.log('Body nhận được:', req.body);

        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json({ message: 'Thiếu userID' });
        }

        // Lấy giỏ hàng của user
        const cart = await CartItem.find({ userID: userID });
        console.log('Giỏ hàng:', cart);

        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống, không thể đặt hàng' });
        }

        // Tính tổng tiền + chuẩn bị data chi tiết đơn
        let total = 0;
        const details = cart.map(item => {
            total += item.price * item.quantity;
            return {
                orderID: null,              // gán sau
                productID: item.productID,
                quantity: item.quantity,
                price: item.price
            };
        });

        // Tạo order
        const order = await Order.create({
            userID: userID,
            total: total,
            status: 'pending'
        });

        // Gán orderID cho từng dòng chi tiết
        const detailDocs = details.map(d => ({
            ...d,
            orderID: order._id
        }));

        // Tạo orderdetail
        await OrderDetail.insertMany(detailDocs);

        // Xóa giỏ hàng của user
        await CartItem.deleteMany({ userID: userID });

        res.json({
            message: 'Đặt hàng thành công',
            orderID: order._id,
            total: total
        });
    } catch (err) {
        console.error('ERROR /order/create:', err);
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

// ================== XEM DANH SÁCH ĐƠN HÀNG CỦA USER ==================
// GET /order/user/:userID
router.get('/user/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const orders = await Order.find({ userID: userID }).sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        console.error('ERROR /order/user/:userID', err);
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

// ================== XEM CHI TIẾT 1 ĐƠN HÀNG ==================
// GET /order/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        // ⭐ JOIN orderdetails -> product
        const details = await OrderDetail.find({ orderID: id })
            .populate({
                path: "productID",
                select: "name price description"   // muốn trường nào thì select
            });

        res.json({
            order,
            details
        });
    } catch (err) {
        console.error('ERROR /order/:id', err);
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

module.exports = router;
