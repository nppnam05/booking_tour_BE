const db = require('../configs/database');

class User {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async findByRole(role) {
        const [rows] = await db.query('SELECT * FROM users WHERE role = ?', [role]);
        return rows;
    }

    static async create(user) {
        const [result] = await db.query('INSERT INTO users SET ?', user);
        return { ...user, id: result.insertId };
    }

    static async update(id, user) {
        const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = User;