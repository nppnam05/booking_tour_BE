const TourItinerary = require('../models/tour_itinerarie');

exports.findAll = async (req, res) => {
    try {
        const itineraries = await TourItinerary.findAll();
        res.status(200).json(itineraries);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const itinerary = await TourItinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Không tìm thấy lịch trình tour' });
        }
        res.status(200).json(itinerary);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByTourId = async (req, res) => {
    try {
        const itineraries = await TourItinerary.findByTourId(req.query.tour_id);
        res.status(200).json(itineraries);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItinerary = await TourItinerary.create(req.body);
        res.status(201).json({ message: 'Thêm lịch trình tour thành công', itinerary: newItinerary });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await TourItinerary.update(req.params.id, req.body);
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
        const affectedRows = await TourItinerary.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy lịch trình tour' });
        }
        res.status(200).json({ message: 'Xóa lịch trình tour thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};