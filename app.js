// 1. GỌI DOTENV NGAY DÒNG ĐẦU TIÊN
require('dotenv').config(); 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Import Models
require('./models/user');
require('./models/category');
require('./models/product');
require('./models/order');
require('./models/orderdetail');
require('./models/cartItem');
require('./models/image');

// Import Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categoryRouter');
var productRouter = require('./routes/productRouter');
var orderRouter = require('./routes/orderRouter');
var userRouter1 = require('./routes/userRouter1');
var cartRouter = require('./routes/cartRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. KẾT NỐI MONGODB DÙNG BIẾN MÔI TRƯỜNG ---
const connectDB = async () => {
  try {
    // Nó sẽ lấy chuỗi từ file .env, nếu không có thì chạy localhost (dự phòng)
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/assignment";
    
    await mongoose.connect(uri);
    console.log('>>>>>>>>>> DB Connected!!!!!!');
  } catch (err) {
    console.log('>>>>>>>>> DB Error: ', err);
  }
};
connectDB();

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter1);
app.use('/cart', cartRouter);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// --- 3. LẮNG NGHE PORT ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT}`);
});

module.exports = app;