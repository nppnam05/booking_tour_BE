const db = require('../configs/database');

class HotelImage {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM hotel_images');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM hotel_images WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByHotelId(hotelId) {
        const [rows] = await db.query('SELECT * FROM hotel_images WHERE hotel_id = ?', [hotelId]);
        return rows;
    }

    static async create(hotelImage) {
        const [result] = await db.query('INSERT INTO hotel_images SET ?', hotelImage);
        return { ...hotelImage, id: result.insertId };
    }

    static async update(id, hotelImage) {
        const [result] = await db.query('UPDATE hotel_images SET ? WHERE id = ?', [hotelImage, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM hotel_images WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = HotelImage;