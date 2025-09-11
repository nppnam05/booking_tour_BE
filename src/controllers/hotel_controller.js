const Hotel = require('../models/hotel');

const hotelController = {

    findAll: async (req, res) => {
        try {
            const hotels = await Hotel.findAll();
            res.status(200).json(hotels);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id);
            if (!hotel) {
                return res.status(404).json({ message: 'Không tìm thấy khách sạn' });
            }
            res.status(200).json(hotel);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByCategoryId: async (req, res) => {
        try {
            const hotels = await Hotel.findByCategoryId(req.query.category_tour_id);
            res.status(200).json(hotels);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newHotel = await Hotel.create(req.body);
            res.status(201).json({ message: 'Thêm khách sạn thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await Hotel.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy khách sạn' });
            }
            res.status(200).json({ message: 'Cập nhật khách sạn thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await Hotel.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy khách sạn' });
            }
            res.status(200).json({ message: 'Xóa khách sạn thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = hotelController;