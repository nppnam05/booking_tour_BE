const GuideEvaluation = require('../models/guide_evaluation');

exports.findAll = async (req, res) => {
    try {
        const evaluations = await GuideEvaluation.findAll();
        res.status(200).json(evaluations);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const evaluation = await GuideEvaluation.findById(req.params.id);
        if (!evaluation) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá hướng dẫn viên' });
        }
        res.status(200).json(evaluation);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByGuideId = async (req, res) => {
    try {
        const evaluations = await GuideEvaluation.findByGuideId(req.query.guide_id);
        res.status(200).json(evaluations);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByTourScheduleId = async (req, res) => {
    try {
        const evaluations = await GuideEvaluation.findByTourScheduleId(req.query.tour_schedule_id);
        res.status(200).json(evaluations);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newEvaluation = await GuideEvaluation.create(req.body);
        res.status(201).json({ message: 'Thêm đánh giá thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await GuideEvaluation.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
        }
        res.status(200).json({ message: 'Cập nhật đánh giá thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await GuideEvaluation.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
        }
        res.status(200).json({ message: 'Xóa đánh giá thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};