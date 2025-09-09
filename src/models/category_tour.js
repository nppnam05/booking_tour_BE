const db = require('../configs/database');

class CategoryTour {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM category_tours');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM category_tours WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByLocationId(locationId) {
        const [rows] = await db.query('SELECT * FROM category_tours WHERE location_id = ?', [locationId]);
        return rows;
    }

    static async findByName(name) {
        const [rows] = await db.query('SELECT * FROM category_tours WHERE name LIKE ?', [`%${name}%`]);
        return rows;
    }

    static async create(categoryTour) {
        const [result] = await db.query('INSERT INTO category_tours SET ?', categoryTour);
        return { id: result.insertId, ...categoryTour };
    }

    static async update(id, categoryTour) {
        const [result] = await db.query('UPDATE category_tours SET ? WHERE id = ?', [categoryTour, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM category_tours WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = CategoryTour;