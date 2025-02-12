const express = require('express');
const app = express();
const userRouter = require('./router/users');
const productRouter = require('./router/products');
const orderRouter = require('./router/orders');
const connectDB = require('./config/db');

const port = 4000;

// Koneksi ke database MongoDB sebelum menjalankan server
connectDB();

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

// Middleware untuk menangani error 404 (route tidak ditemukan)
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route tidak ditemukan" });
});

// Middleware untuk menangani error secara global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
