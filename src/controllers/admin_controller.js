const Admin = require('../models/admin');

exports.findAll = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Không tìm thấy admin' });
        }
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.findByEmail = async (req, res) => {
    try {
        const admin = await Admin.findByEmail(req.query.email);
        if (!admin) {
            return res.status(404).json({ message: 'Không tìm thấy admin với email này' });
        }
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json({ message: 'Thêm admin thành công', admin: newAdmin });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const affectedRows = await Admin.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy admin' });
        }
        res.status(200).json({ message: 'Cập nhật admin thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await Admin.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy admin' });
        }
        res.status(200).json({ message: 'Xóa admin thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};