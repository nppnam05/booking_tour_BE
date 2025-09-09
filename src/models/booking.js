const db = require('../configs/database');

class Booking {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM bookings');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM bookings WHERE user_id = ?', [userId]);
        return rows;
    }

    static async findByBookingCode(bookingCode) {
        const [rows] = await db.query('SELECT * FROM bookings WHERE booking_code = ?', [bookingCode]);
        return rows[0];
    }

    static async create(booking) {
        const [result] = await db.query('INSERT INTO bookings SET ?', booking);
        return { id: result.insertId, ...booking };
    }

    static async update(id, booking) {
        const [result] = await db.query('UPDATE bookings SET ? WHERE id = ?', [booking, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Booking;