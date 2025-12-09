var express = require('express');
var router = express.Router();
var userRouter = require('../models/user');

// Dang ky
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const exist = await userRouter.findOne({ email });
        if (exist) return res.status(400).json({ message: "Email đã tồn tại" });

        const user = await userRouter.create({ name, email, password, phone, address });
        res.json({ message: "Đăng ký thành công", user });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
});
// Dang nhap
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userRouter.findOne({ email, password });
        if (!user) return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

        res.json({ message: "Đăng nhập thành công", user });
    } catch {
        res.status(500).json({ message: "Lỗi server" });
    }
});
// Cap nhat
router.put('/:id', async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        const user = await userRouter.findByIdAndUpdate(
            req.params.id,
            { name, phone, address },
            { new: true }
        );

        res.json({ message: "Cập nhật thành công", user });
    } catch {
        res.status(500).json({ message: "Lỗi server" });
    }
});
module.exports = router;