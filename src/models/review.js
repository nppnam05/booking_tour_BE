const db = require('../configs/database');

class Review {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM reviews');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByTourId(tourId) {
        const [rows] = await db.query('SELECT * FROM reviews WHERE tour_id = ?', [tourId]);
        return rows;
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM reviews WHERE user_id = ?', [userId]);
        return rows;
    }

    static async create(review) {
        const [result] = await db.query('INSERT INTO reviews SET ?', review);
        return { id: result.insertId, ...review };
    }

    static async update(id, review) {
        const [result] = await db.query('UPDATE reviews SET ? WHERE id = ?', [review, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Review;