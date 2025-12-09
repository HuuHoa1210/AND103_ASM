const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    phone:    { type: String },
    address:  { type: String },
    role:   { type: String, default: 'user' },        
    status: { type: String, default: 'active' }      
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
