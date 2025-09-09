const db = require('../configs/database');

class Admin {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM admins');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM admins WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(admin) {
        const [result] = await db.query('INSERT INTO admins SET ?', admin);
        return { id: result.insertId, ...admin };
    }

    static async update(id, admin) {
        const [result] = await db.query('UPDATE admins SET ? WHERE id = ?', [admin, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM admins WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Admin;