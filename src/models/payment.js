const db = require('../configs/database');

class Payment {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM payments');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM payments WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByBookingId(bookingId) {
        const [rows] = await db.query('SELECT * FROM payments WHERE booking_id = ?', [bookingId]);
        return rows;
    }

    static async findByTransactionId(transactionId) {
        const [rows] = await db.query('SELECT * FROM payments WHERE transaction_id = ?', [transactionId]);
        return rows[0];
    }

    static async create(payment) {
        const [result] = await db.query('INSERT INTO payments SET ?', payment);
        return { ...payment, id: result.insertId };
    }

    static async update(id, payment) {
        const [result] = await db.query('UPDATE payments SET ? WHERE id = ?', [payment, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM payments WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Payment;