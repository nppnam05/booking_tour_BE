const UserCompletedTour = require('../models/user_completed_tour');

exports.findAll = async (req, res) => {
    try {
        const completedTours = await UserCompletedTour.findAll();
        res.status(200).json(completedTours);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const completedTour = await UserCompletedTour.findById(req.params.id);
        if (!completedTour) {
            return res.status(404).json({ message: 'Không tìm thấy lịch sử hoàn thành tour' });
        }
        res.status(200).json(completedTour);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByUserId = async (req, res) => {
    try {
        const completedTours = await UserCompletedTour.findByUserId(req.query.user_id);
        res.status(200).json(completedTours);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByTourId = async (req, res) => {
    try {
        const completedTours = await UserCompletedTour.findByTourId(req.query.tour_id);
        res.status(200).json(completedTours);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newCompletedTour = await UserCompletedTour.create(req.body);
        res.status(201).json({ message: 'Thêm lịch sử hoàn thành tour thành công', completedTour: newCompletedTour });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await UserCompletedTour.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy lịch sử hoàn thành tour' });
        }
        res.status(200).json({ message: 'Cập nhật lịch sử hoàn thành tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await UserCompletedTour.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy lịch sử hoàn thành tour' });
        }
        res.status(200).json({ message: 'Xóa lịch sử hoàn thành tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};