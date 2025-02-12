const Order = require('../models/order');
const Product = require('../models/product'); // Pastikan model Product tersedia

module.exports = {
    // Get all orders
    index: async (req, res) => {
        try {
            const orders = await Order.find().populate('product', 'name price stock category');
            res.status(200).json({
                status: true,
                data: orders,
                method: req.method,
                url: req.url
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Get a single order
    show: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate('product', 'name price stock category');
            if (!order) {
                return res.status(404).json({ status: false, message: "Order tidak ditemukan" });
            }
            res.json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil didapat"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Create a new order (stok produk dikurangi otomatis)
    store: async (req, res) => {
        try {
            const product = await Product.findOne({ name: req.body.product_name });

            if (!product) {
                return res.status(404).json({ status: false, message: "Produk tidak ditemukan" });
            }

            if (product.stock < req.body.quantity) {
                return res.status(400).json({
                    status: false,
                    message: `Stok tidak mencukupi! Stok tersedia: ${product.stock}`
                });
            }

            // Kurangi stok produk
            product.stock -= req.body.quantity;
            await product.save();

            // Simpan order
            const order = await Order.create({
                product: product._id,
                quantity: req.body.quantity,
                total_price: product.price * req.body.quantity
            });

            res.status(201).json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Order berhasil ditambahkan dan stok diperbarui"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Update an order (stok diperbarui otomatis)
    update: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ status: false, message: "Order tidak ditemukan" });
            }

            const product = await Product.findById(order.product);
            if (!product) {
                return res.status(404).json({ status: false, message: "Produk tidak ditemukan" });
            }

            // Tambah kembali stok lama sebelum diupdate
            product.stock += order.quantity;

            // Cek jika ada perubahan jumlah
            if (req.body.quantity) {
                if (product.stock < req.body.quantity) {
                    return res.status(400).json({
                        status: false,
                        message: `Stok tidak mencukupi! Stok tersedia: ${product.stock}`
                    });
                }

                // Kurangi stok baru
                product.stock -= req.body.quantity;
            }

            await product.save();

            // Update order
            order.quantity = req.body.quantity || order.quantity;
            order.total_price = product.price * order.quantity;
            await order.save();

            res.json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil diubah dan stok diperbarui"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Delete an order (stok dikembalikan otomatis)
    delete: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ status: false, message: "Order tidak ditemukan" });
            }

            const product = await Product.findById(order.product);
            if (product) {
                // Kembalikan stok
                product.stock += order.quantity;
                await product.save();
            }

            await Order.findByIdAndDelete(req.params.id);

            res.json({
                status: true,
                method: req.method,
                url: req.url,
                message: "Data berhasil dihapus dan stok dikembalikan"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
};
