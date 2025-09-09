const User = require('../models/user');


exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};


exports.findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};


exports.findByEmail = async (req, res) => {
    try {
        const user = await User.findByEmail(req.query.email);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với email này' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};


exports.findByRole = async (req, res) => {
    try {
        const users = await User.findByRole(req.query.role);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};


exports.create = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ message: 'Thêm thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};


exports.update = async (req, res) => {
    try {
        const affectedRows = await User.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};


exports.delete = async (req, res) => {
    try {
        const affectedRows = await User.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};


exports.checkUsernameExists = async (req, res) => {
    try {
        const user = await User.findByUsername(req.query.username);
        res.status(200).json({ result: !!user });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
};
