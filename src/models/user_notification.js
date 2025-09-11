const db = require('../configs/database');

class UserNotification {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM user_notifications');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM user_notifications WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM user_notifications WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        return rows;
    }

    static async create(userNotification) {
        const [result] = await db.query('INSERT INTO user_notifications SET ?', userNotification);
        return { ...userNotification, id: result.insertId };
    }

    static async update(id, userNotification) {
        const [result] = await db.query('UPDATE user_notifications SET ? WHERE id = ?', [userNotification, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM user_notifications WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = UserNotification;