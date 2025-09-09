const db = require('../configs/database');

class Favorite {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM favorites');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM favorites WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM favorites WHERE user_id = ?', [userId]);
        return rows;
    }

    static async findByTourId(tourId) {
        const [rows] = await db.query('SELECT * FROM favorites WHERE tour_id = ?', [tourId]);
        return rows;
    }

    static async create(favorite) {
        const [result] = await db.query('INSERT INTO favorites SET ?', favorite);
        return { id: result.insertId, ...favorite };
    }

    static async update(id, favorite) {
        const [result] = await db.query('UPDATE favorites SET ? WHERE id = ?', [favorite, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM favorites WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Favorite;