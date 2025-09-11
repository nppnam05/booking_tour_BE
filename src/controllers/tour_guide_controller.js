const TourGuide = require('../models/tour_guide');

const tourGuideController = {

    findAll: async (req, res) => {
        try {
            const guides = await TourGuide.findAll();
            res.status(200).json(guides);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const guide = await TourGuide.findById(req.params.id);
            if (!guide) {
                return res.status(404).json({ message: 'Không tìm thấy hướng dẫn viên' });
            }
            res.status(200).json(guide);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByUserId: async (req, res) => {
        try {
            const guide = await TourGuide.findByUserId(req.query.user_id);
            if (!guide) {
                return res.status(404).json({ message: 'Không tìm thấy hướng dẫn viên với user này' });
            }
            res.status(200).json(guide);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByManager: async (req, res) => {
        try {
            const guides = await TourGuide.findByManager(req.query.manager_id);
            res.status(200).json(guides);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newGuide = await TourGuide.create(req.body);
            res.status(201).json({ message: 'Thêm hướng dẫn viên thành công', guide: newGuide });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await TourGuide.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy hướng dẫn viên' });
            }
            res.status(200).json({ message: 'Cập nhật hướng dẫn viên thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await TourGuide.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy hướng dẫn viên' });
            }
            res.status(200).json({ message: 'Xóa hướng dẫn viên thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = tourGuideController;