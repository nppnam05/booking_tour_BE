const Booking = require('../models/booking');

exports.findAll = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy booking' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByUserId = async (req, res) => {
    try {
        const bookings = await Booking.findByUserId(req.query.user_id);
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByBookingCode = async (req, res) => {
    try {
        const booking = await Booking.findByBookingCode(req.query.booking_code);
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy booking với mã này' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.status(201).json({ message: 'Thêm booking thành công', booking: newBooking });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await Booking.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy booking' });
        }
        res.status(200).json({ message: 'Cập nhật booking thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await Booking.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy booking' });
        }
        res.status(200).json({ message: 'Xóa booking thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};