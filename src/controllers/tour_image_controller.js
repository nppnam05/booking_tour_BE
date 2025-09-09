const TourImage = require('../models/tour_image');

exports.findAll = async (req, res) => {
    try {
        const images = await TourImage.findAll();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const image = await TourImage.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh tour' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByTourId = async (req, res) => {
    try {
        const images = await TourImage.findByTourId(req.query.tour_id);
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newImage = await TourImage.create(req.body);
        res.status(201).json({ message: 'Thêm hình ảnh tour thành công', image: newImage });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await TourImage.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh tour' });
        }
        res.status(200).json({ message: 'Cập nhật hình ảnh tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await TourImage.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh tour' });
        }
        res.status(200).json({ message: 'Xóa hình ảnh tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};