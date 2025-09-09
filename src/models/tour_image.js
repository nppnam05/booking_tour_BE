const db = require('../configs/database');

class TourImage {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tour_images');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM tour_images WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByTourId(tourId) {
        const [rows] = await db.query('SELECT * FROM tour_images WHERE tour_id = ?', [tourId]);
        return rows;
    }

    static async create(tourImage) {
        const [result] = await db.query('INSERT INTO tour_images SET ?', tourImage);
        return { id: result.insertId, ...tourImage };
    }

    static async update(id, tourImage) {
        const [result] = await db.query('UPDATE tour_images SET ? WHERE id = ?', [tourImage, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM tour_images WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = TourImage;