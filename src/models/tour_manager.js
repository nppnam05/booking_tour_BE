const db = require('../configs/database');

class TourManager {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tour_managers');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM tour_managers WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM tour_managers WHERE user_id = ?', [userId]);
        return rows[0];
    }

    static async create(tourManager) {
        const [result] = await db.query('INSERT INTO tour_managers SET ?', tourManager);
        return { ...tourManager, id: result.insertId };
    }

    static async update(id, tourManager) {
        const [result] = await db.query('UPDATE tour_managers SET ? WHERE id = ?', [tourManager, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM tour_managers WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = TourManager;