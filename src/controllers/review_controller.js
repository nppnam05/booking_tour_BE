const Review = require('../models/review');

const reviewController = {

    findAll: async (req, res) => {
        try {
            const reviews = await Review.findAll();
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) {
                return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
            }
            res.status(200).json(review);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByTourId: async (req, res) => {
        try {
            const reviews = await Review.findByTourId(req.query.tour_id);
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByUserId: async (req, res) => {
        try {
            const reviews = await Review.findByUserId(req.query.user_id);
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newReview = await Review.create(req.body);
            res.status(201).json({ message: 'Thêm đánh giá thành công', review: newReview });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await Review.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
            }
            res.status(200).json({ message: 'Cập nhật đánh giá thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await Review.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
            }
            res.status(200).json({ message: 'Xóa đánh giá thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = reviewController;