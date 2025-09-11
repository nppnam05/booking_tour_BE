const Location = require('../models/location');

const locationController = {

    findAll: async (req, res) => {
        try {
            const locations = await Location.findAll();
            res.status(200).json(locations);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const location = await Location.findById(req.params.id);
            if (!location) {
                return res.status(404).json({ message: 'Không tìm thấy địa điểm' });
            }
            res.status(200).json(location);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newLocation = await Location.create(req.body);
            res.status(201).json({ message: 'Thêm địa điểm thành công', location: newLocation });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await Location.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy địa điểm' });
            }
            res.status(200).json({ message: 'Cập nhật địa điểm thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await Location.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy địa điểm' });
            }
            res.status(200).json({ message: 'Xóa địa điểm thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    searchByName: async (req, res) => {
        try {
            const locations = await Location.searchByName(req.query.name);
            res.status(200).json(locations);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = locationController;