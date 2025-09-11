const db = require('../configs/database');

class TourSchedule {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tour_schedules');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM tour_schedules WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByTourId(tourId) {
        const [rows] = await db.query('SELECT * FROM tour_schedules WHERE tour_id = ?', [tourId]);
        return rows;
    }

    static async findByManagerId(managerId) {
        const [rows] = await db.query('SELECT * FROM tour_schedules WHERE tour_manager_id = ?', [managerId]);
        return rows;
    }

    static async create(tourSchedule) {
        const [result] = await db.query('INSERT INTO tour_schedules SET ?', tourSchedule);
        return { ...tourSchedule, id: result.insertId };
    }

    static async update(id, tourSchedule) {
        const [result] = await db.query('UPDATE tour_schedules SET ? WHERE id = ?', [tourSchedule, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM tour_schedules WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = TourSchedule;