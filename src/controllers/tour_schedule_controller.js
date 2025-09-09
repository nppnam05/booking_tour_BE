const TourSchedule = require('../models/tour_schedule');

exports.findAll = async (req, res) => {
    try {
        const schedules = await TourSchedule.findAll();
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const schedule = await TourSchedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: 'Không tìm thấy lịch trình tour' });
        }
        res.status(200).json(schedule);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByTourId = async (req, res) => {
    try {
        const schedules = await TourSchedule.findByTourId(req.query.tour_id);
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByManagerId = async (req, res) => {
    try {
        const schedules = await TourSchedule.findByManagerId(req.query.tour_manager_id);
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newSchedule = await TourSchedule.create(req.body);
        res.status(201).json({ message: 'Thêm lịch trình tour thành công', schedule: newSchedule });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await TourSchedule.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy lịch trình tour' });
        }
        res.status(200).json({ message: 'Cập nhật lịch trình tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await TourSchedule.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy lịch trình tour' });
        }
        res.status(200).json({ message: 'Xóa lịch trình tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};