const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    userID: { type: ObjectId, ref: "user" },
     // khóa ngoại tham chiếu đến người dùng
    products: [
        {
            productID: { type: ObjectId, ref: "product" }, // khóa ngoại tham chiếu đến sản phẩm
            quantity: { type: Number }, // số lượng sản phẩm trong giỏ hàng
        }
    ],
    updateAt: { type: Date }, // ngày cập nhật giỏ hàng
});
module.exports = mongoose.models.cart || mongoose.model('cart', cartSchema);