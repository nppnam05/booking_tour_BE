const TourManager = require('../models/tour_manager');

exports.findAll = async (req, res) => {
    try {
        const managers = await TourManager.findAll();
        res.status(200).json(managers);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const manager = await TourManager.findById(req.params.id);
        if (!manager) {
            return res.status(404).json({ message: 'Không tìm thấy quản lý tour' });
        }
        res.status(200).json(manager);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByUserId = async (req, res) => {
    try {
        const manager = await TourManager.findByUserId(req.query.user_id);
        if (!manager) {
            return res.status(404).json({ message: 'Không tìm thấy quản lý tour với user này' });
        }
        res.status(200).json(manager);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newManager = await TourManager.create(req.body);
        res.status(201).json({ message: 'Thêm quản lý tour thành công', manager: newManager });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await TourManager.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy quản lý tour' });
        }
        res.status(200).json({ message: 'Cập nhật quản lý tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await TourManager.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy quản lý tour' });
        }
        res.status(200).json({ message: 'Xóa quản lý tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};