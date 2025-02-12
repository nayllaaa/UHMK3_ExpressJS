const Order = require('../models/order');

module.exports = {
    // Get all orders
    index: async (req, res) => {
        try {
            const orders = await Order.find();
            if (orders.length > 0) {
                res.status(200).json({
                    status: true,
                    data: orders,
                    method: req.method,
                    url: req.url
                });
            } else {
                res.json({
                    status: false,
                    message: "Data masih kosong"
                });
            }
        } catch (error) {
            res.status(400).json({ success: false });
        }
    },

    // Get a single order
    show: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            res.json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil didapat"
            });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    },

    // Create a new order
    store: async (req, res) => {
        try {
            const order = await Order.create(req.body);
            res.status(200).json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil ditambahkan"
            });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    },

    // Update an order
    update: async (req, res) => {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            res.json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil diubah"
            });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    },

    // Delete an order
    delete: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.json({
                status: true,
                method: req.method,
                url: req.url,
                message: "Data berhasil dihapus"
            });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
};
