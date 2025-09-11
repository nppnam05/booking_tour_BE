const GuideAssignment = require('../models/guide_assignment');

const guideAssignmentController = {

    findAll: async (req, res) => {
        try {
            const assignments = await GuideAssignment.findAll();
            res.status(200).json(assignments);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const assignment = await GuideAssignment.findById(req.params.id);
            if (!assignment) {
                return res.status(404).json({ message: 'Không tìm thấy phân công hướng dẫn viên' });
            }
            res.status(200).json(assignment);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByTourScheduleId: async (req, res) => {
        try {
            const assignments = await GuideAssignment.findByTourScheduleId(req.query.tour_schedule_id);
            res.status(200).json(assignments);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    findByGuideId: async (req, res) => {
        try {
            const assignments = await GuideAssignment.findByGuideId(req.query.guide_id);
            res.status(200).json(assignments);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newAssignment = await GuideAssignment.create(req.body);
            res.status(201).json({ message: 'Thêm phân công thành công', assignment: newAssignment });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const affectedRows = await GuideAssignment.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy phân công' });
            }
            res.status(200).json({ message: 'Cập nhật phân công thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const affectedRows = await GuideAssignment.delete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy phân công' });
            }
            res.status(200).json({ message: 'Xóa phân công thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
        }
    }
};

module.exports = guideAssignmentController;