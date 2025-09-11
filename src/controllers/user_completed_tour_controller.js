const UserCompletedTour = require('../models/user_completed_tour');

const userCompletedTourController = {

    findAll: async (req, res) => {
        try {
            const completedTours = await UserCompletedTour.findAll();
            res.status(200).json(completedTours);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const completedTour = await UserCompletedTour.findById(req.params.id);
            if (!completedTour) {
                return res.status(404).json({ message: 'Không tìm thấy lịch sử hoàn thành tour' });
            }
            res.status(200).json(completedTour);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByUserId: async (req, res) => {
        try {
            const completedTours = await UserCompletedTour.findByUserId(req.query.user_id);
            res.status(200).json(completedTours);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByTourId: async (req, res) => {
        try {
            const completedTours = await UserCompletedTour.findByTourId(req.query.tour_id);
            res.status(200).json(completedTours);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newCompletedTour = await UserCompletedTour.create(req.body);
            res.status(201).json({ message: 'Thêm lịch sử hoàn thành tour thành công', completedTour: newCompletedTour });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await UserCompletedTour.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy lịch sử hoàn thành tour' });
            }
            res.status(200).json({ message: 'Cập nhật lịch sử hoàn thành tour thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await UserCompletedTour.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy lịch sử hoàn thành tour' });
            }
            res.status(200).json({ message: 'Xóa lịch sử hoàn thành tour thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = userCompletedTourController;