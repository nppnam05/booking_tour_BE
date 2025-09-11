const Favorite = require('../models/favorite');


const favoriteController = {

    findAll: async (req, res) => {
        try {
            const favorites = await Favorite.findAll();
            res.status(200).json(favorites);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const favorite = await Favorite.findById(req.params.id);
            if (!favorite) {
                return res.status(404).json({ message: 'Không tìm thấy favorite' });
            }
            res.status(200).json(favorite);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByUserId: async (req, res) => {
        try {
            const favorites = await Favorite.findByUserId(req.query.user_id);
            res.status(200).json(favorites);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByTourId: async (req, res) => {
        try {
            const favorites = await Favorite.findByTourId(req.query.tour_id);
            res.status(200).json(favorites);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newFavorite = await Favorite.create(req.body);
            res.status(201).json({ message: 'Thêm favorite thành công', favorite: newFavorite });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await Favorite.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy favorite' });
            }
            res.status(200).json({ message: 'Cập nhật favorite thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await Favorite.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy favorite' });
            }
            res.status(200).json({ message: 'Xóa favorite thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = favoriteController;