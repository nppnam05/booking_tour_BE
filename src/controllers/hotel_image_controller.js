const HotelImage = require('../models/hotel_image');

const hotelImageController = {

    findAll: async (req, res) => {
        try {
            const images = await HotelImage.findAll();
            res.status(200).json(images);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const image = await HotelImage.findById(req.params.id);
            if (!image) {
                return res.status(404).json({ message: 'Không tìm thấy hình ảnh khách sạn' });
            }
            res.status(200).json(image);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByHotelId: async (req, res) => {
        try {
            const images = await HotelImage.findByHotelId(req.query.hotel_id);
            res.status(200).json(images);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newImage = await HotelImage.create(req.body);
            res.status(201).json({ message: 'Thêm hình ảnh thành công', image: newImage });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await HotelImage.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy hình ảnh' });
            }
            res.status(200).json({ message: 'Cập nhật hình ảnh thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await HotelImage.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy hình ảnh' });
            }
            res.status(200).json({ message: 'Xóa hình ảnh thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = hotelImageController;