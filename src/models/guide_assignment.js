const db = require('../configs/database');

class GuideAssignment {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM guide_assignments');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM guide_assignments WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByTourScheduleId(scheduleId) {
        const [rows] = await db.query('SELECT * FROM guide_assignments WHERE tour_schedule_id = ?', [scheduleId]);
        return rows;
    }

    static async findByGuideId(guideId) {
        const [rows] = await db.query('SELECT * FROM guide_assignments WHERE guide_id = ?', [guideId]);
        return rows;
    }

    static async create(guideAssignment) {
        const [result] = await db.query('INSERT INTO guide_assignments SET ?', guideAssignment);
        return { id: result.insertId, ...guideAssignment };
    }

    static async update(id, guideAssignment) {
        const [result] = await db.query('UPDATE guide_assignments SET ? WHERE id = ?', [guideAssignment, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM guide_assignments WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = GuideAssignment;