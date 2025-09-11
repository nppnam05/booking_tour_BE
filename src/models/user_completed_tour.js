const db = require('../configs/database');

class UserCompletedTour {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM user_completed_tours');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM user_completed_tours WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM user_completed_tours WHERE user_id = ?', [userId]);
        return rows;
    }

    static async findByTourId(tourId) {
        const [rows] = await db.query('SELECT * FROM user_completed_tours WHERE tour_id = ?', [tourId]);
        return rows;
    }

    static async create(userCompletedTour) {
        const [result] = await db.query('INSERT INTO user_completed_tours SET ?', userCompletedTour);
        return { ...userCompletedTour, id: result.insertId };
    }

    static async update(id, userCompletedTour) {
        const [result] = await db.query('UPDATE user_completed_tours SET ? WHERE id = ?', [userCompletedTour, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM user_completed_tours WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = UserCompletedTour;