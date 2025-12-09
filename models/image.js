const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const imageSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    url: { type: String }, // đường dẫn hình ảnh
    productID: { type: ObjectId, ref: "product"}, // khóa ngoại tham chiếu đến sản phẩm
});

module.exports = mongoose.models.image || mongoose.model('image', imageSchema);
// image ---> images