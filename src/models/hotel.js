const db = require('../configs/database');

class Hotel {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM hotels');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM hotels WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByCategoryId(categoryId) {
        const [rows] = await db.query('SELECT * FROM hotels WHERE category_tour_id = ?', [categoryId]);
        return rows;
    }

    static async create(hotel) {
        const [result] = await db.query('INSERT INTO hotels SET ?', hotel);
        return { ...hotel, id: result.insertId };
    }

    static async update(id, hotel) {
        const [result] = await db.query('UPDATE hotels SET ? WHERE id = ?', [hotel, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM hotels WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Hotel;