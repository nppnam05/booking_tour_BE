const Tour = require('../models/tour');

exports.findAll = async (req, res) => {
    try {
        const tours = await Tour.findAll();
        res.status(200).json(tours);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Không tìm thấy tour' });
        }
        res.status(200).json(tour);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByCategoryId = async (req, res) => {
    try {
        const tours = await Tour.findByCategoryId(req.query.category_tour_id);
        res.status(200).json(tours);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({ message: 'Thêm tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await Tour.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy tour' });
        }
        res.status(200).json({ message: 'Cập nhật tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await Tour.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy tour' });
        }
        res.status(200).json({ message: 'Xóa tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};  