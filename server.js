const express = require('express');
const app = express();
const userRouter = require('./router/users');
const productRouter = require('./router/products');
const orderRouter = require('./router/orders');
const port = 4000;
const connectDB = require('./config/db');

// Middleware untuk parsing JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route dasar
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Menggunakan router yang telah dibuat
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);

// Koneksi ke database MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
