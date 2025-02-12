const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Silakan pilih produk']
    },
    quantity: {
        type: Number,
        required: [true, 'Silakan isi jumlah pesanan'],
        min: [1, 'Jumlah pesanan minimal 1']
    },
    total_price: {
        type: Number,
        required: [true, 'Silakan isi total harga']
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
