const db = require('../configs/database');

class TourItinerary {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tour_itineraries');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM tour_itineraries WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByTourId(tourId) {
        const [rows] = await db.query('SELECT * FROM tour_itineraries WHERE tour_id = ? ORDER BY day ASC', [tourId]);
        return rows;
    }

    static async create(tourItinerary) {
        const [result] = await db.query('INSERT INTO tour_itineraries SET ?', tourItinerary);
        return { ...tourItinerary, id: result.insertId };
    }

    static async update(id, tourItinerary) {
        const [result] = await db.query('UPDATE tour_itineraries SET ? WHERE id = ?', [tourItinerary, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM tour_itineraries WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = TourItinerary;