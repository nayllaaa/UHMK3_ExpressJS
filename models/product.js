const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Silakan isi nama produk'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Silakan isi harga produk']
    },
    stock: {
        type: Number,
        required: [true, 'Silakan isi stok produk'],
        min: [0, 'Stok tidak boleh kurang dari 0']
    },
    category: {
        type: String,
        required: [true, 'Silakan isi kategori produk']
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
