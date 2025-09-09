const db = require('../configs/database');

class Location {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM locations');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM locations WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(location) {
        const [result] = await db.query('INSERT INTO locations SET ?', location);
        return { id: result.insertId, ...location };
    }

    static async update(id, location) {
        const [result] = await db.query('UPDATE locations SET ? WHERE id = ?', [location, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM locations WHERE id = ?', [id]);
        return result.affectedRows;
    }

    static async searchByName(name) {
        const [rows] = await db.query('SELECT * FROM locations WHERE name LIKE ?', [`%${name}%`]);
        return rows;
    }
}

module.exports = Location;