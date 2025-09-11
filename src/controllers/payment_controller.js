const Payment = require('../models/payment');

const paymentController = {

    findAll: async (req, res) => {
        try {
            const payments = await Payment.findAll();
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const payment = await Payment.findById(req.params.id);
            if (!payment) {
                return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
            }
            res.status(200).json(payment);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByBookingId: async (req, res) => {
        try {
            const payments = await Payment.findByBookingId(req.query.booking_id);
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByTransactionId: async (req, res) => {
        try {
            const payment = await Payment.findByTransactionId(req.query.transaction_id);
            if (!payment) {
                return res.status(404).json({ message: 'Không tìm thấy giao dịch' });
            }
            res.status(200).json(payment);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newPayment = await Payment.create(req.body);
            res.status(201).json({ message: 'Thêm thanh toán thành công', payment: newPayment });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await Payment.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
            }
            res.status(200).json({ message: 'Cập nhật thanh toán thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await Payment.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
            }
            res.status(200).json({ message: 'Xóa thanh toán thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = paymentController;