const db = require('../configs/database');

class UserStat {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM user_stats');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM user_stats WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM user_stats WHERE user_id = ?', [userId]);
        return rows[0];
    }

    static async create(userStat) {
        const [result] = await db.query('INSERT INTO user_stats SET ?', userStat);
        return { id: result.insertId, ...userStat };
    }

    static async update(id, userStat) {
        const [result] = await db.query('UPDATE user_stats SET ? WHERE id = ?', [userStat, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM user_stats WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = UserStat;