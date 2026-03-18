const db = require('../config/db');

exports.createPayment = async (req, res) => {
  try {
    const { booking_id, amount, method } = req.body;
    const user_id = req.user.id;

    const [result] = await db.query(
      'INSERT INTO payments (booking_id, user_id, amount, method) VALUES (?, ?, ?, ?)',
      [booking_id, user_id, amount, method]
    );

    await db.query(
      'UPDATE bookings SET status = "confirmed" WHERE booking_id = ?',
      [booking_id]
    );

    res.status(201).json({ 
      message: 'Payment successful', 
      payment_id: result.insertId 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Payment failed' });
  }
};