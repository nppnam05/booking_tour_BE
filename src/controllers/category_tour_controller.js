const CategoryTour = require('../models/category_tour');

const categoryTourController = {

    findAll: async (req, res) => {
        try {
            const categories = await CategoryTour.findAll();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const category = await CategoryTour.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Không tìm thấy danh mục tour' });
            }
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByLocationId: async (req, res) => {
        try {
            const categories = await CategoryTour.findByLocationId(req.query.location_id);
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByName: async (req, res) => {
        try {
            const categories = await CategoryTour.findByName(req.query.name);
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newCategory = await CategoryTour.create(req.body);
            res.status(201).json({ message: 'Thêm danh mục tour thành công', category: newCategory });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await CategoryTour.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy danh mục tour' });
            }
            res.status(200).json({ message: 'Cập nhật danh mục tour thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await CategoryTour.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy danh mục tour' });
            }
            res.status(200).json({ message: 'Xóa danh mục tour thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = categoryTourController;