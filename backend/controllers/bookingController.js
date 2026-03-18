const db = require('../config/db');

exports.createBooking = async (req, res) => {
  try {
    const { movie_id, seats, total_price } = req.body;
    const user_id = req.user.id;

    const [result] = await db.query(
      'INSERT INTO bookings (user_id, movie_id, seats, total_price) VALUES (?, ?, ?, ?)',
      [user_id, movie_id, seats, total_price]
    );
    res.status(201).json({ message: 'Booking confirmed', booking_id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(
      `SELECT b.booking_id, b.seats, b.total_price, b.status, b.booked_at,
              m.title, m.genre, m.poster_url
       FROM bookings b
       JOIN movies m ON b.movie_id = m.movie_id
       WHERE b.user_id = ?`,
      [req.user.id]
    );
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};