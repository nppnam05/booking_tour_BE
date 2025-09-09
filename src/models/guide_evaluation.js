const db = require('../configs/database');

class GuideEvaluation {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM guide_evaluations');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM guide_evaluations WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByGuideId(guideId) {
        const [rows] = await db.query('SELECT * FROM guide_evaluations WHERE guide_id = ?', [guideId]);
        return rows;
    }

    static async findByTourScheduleId(scheduleId) {
        const [rows] = await db.query('SELECT * FROM guide_evaluations WHERE tour_schedule_id = ?', [scheduleId]);
        return rows;
    }

    static async create(guideEvaluation) {
        const [result] = await db.query('INSERT INTO guide_evaluations SET ?', guideEvaluation);
        return { id: result.insertId, ...guideEvaluation };
    }

    static async update(id, guideEvaluation) {
        const [result] = await db.query('UPDATE guide_evaluations SET ? WHERE id = ?', [guideEvaluation, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM guide_evaluations WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = GuideEvaluation;