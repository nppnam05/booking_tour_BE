const db = require('../configs/database');

class Tour {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tours');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM tours WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByCategoryId(categoryId) {
        const [rows] = await db.query('SELECT * FROM tours WHERE category_tour_id = ?', [categoryId]);
        return rows;
    }

    static async create(tour) {
        const [result] = await db.query('INSERT INTO tours SET ?', tour);
        return { ...tour, id: result.insertId };
    }

    static async update(id, tour) {
        const [result] = await db.query('UPDATE tours SET ? WHERE id = ?', [tour, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM tours WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Tour;