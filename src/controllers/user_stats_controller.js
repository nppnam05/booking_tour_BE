const UserStat = require('../models/user_stats');

const userStatController = {

    findAll: async (req, res) => {
        try {
            const stats = await UserStat.findAll();
            res.status(200).json(stats);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const stat = await UserStat.findById(req.params.id);
            if (!stat) {
                return res.status(404).json({ message: 'Không tìm thấy thống kê người dùng' });
            }
            res.status(200).json(stat);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByUserId: async (req, res) => {
        try {
            const stat = await UserStat.findByUserId(req.query.user_id);
            if (!stat) {
                return res.status(404).json({ message: 'Không tìm thấy thống kê cho user này' });
            }
            res.status(200).json(stat);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newStat = await UserStat.create(req.body);
            res.status(201).json({ message: 'Thêm thống kê thành công', stat: newStat });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await UserStat.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thống kê người dùng' });
            }
            res.status(200).json({ message: 'Cập nhật thống kê thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await UserStat.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thống kê người dùng' });
            }
            res.status(200).json({ message: 'Xóa thống kê thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = userStatController;