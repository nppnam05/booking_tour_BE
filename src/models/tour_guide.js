const db = require('../configs/database');

class TourGuide {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tour_guides');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM tour_guides WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM tour_guides WHERE user_id = ?', [userId]);
        return rows[0];
    }

    static async findByManager(managerId) {
        const [rows] = await db.query('SELECT * FROM tour_guides WHERE managed_by = ?', [managerId]);
        return rows;
    }

    static async create(tourGuide) {
        const [result] = await db.query('INSERT INTO tour_guides SET ?', tourGuide);
        return { ...tourGuide, id: result.insertId };
    }

    static async update(id, tourGuide) {
        const [result] = await db.query('UPDATE tour_guides SET ? WHERE id = ?', [tourGuide, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM tour_guides WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = TourGuide;