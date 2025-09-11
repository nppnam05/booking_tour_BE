const UserNotification = require('../models/user_notification');

const userNotificationController = {

    findAll: async (req, res) => {
        try {
            const notifications = await UserNotification.findAll();
            res.status(200).json(notifications);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const notification = await UserNotification.findById(req.params.id);
            if (!notification) {
                return res.status(404).json({ message: 'Không tìm thấy thông báo' });
            }
            res.status(200).json(notification);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByUserId: async (req, res) => {
        try {
            const notifications = await UserNotification.findByUserId(req.query.user_id);
            res.status(200).json(notifications);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newNotification = await UserNotification.create(req.body);
            res.status(201).json({ message: 'Thêm thông báo thành công', notification: newNotification });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await UserNotification.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thông báo' });
            }
            res.status(200).json({ message: 'Cập nhật thông báo thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await UserNotification.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thông báo' });
            }
            res.status(200).json({ message: 'Xóa thông báo thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = userNotificationController;