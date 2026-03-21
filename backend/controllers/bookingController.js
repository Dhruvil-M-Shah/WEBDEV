const db = require('../config/db');

exports.createBooking = async (req, res) => {
  try {
    const { movie_id, seats, total_price, city, theatre_name, show_date, show_time, food_items } = req.body;
    const user_id = req.user.id;

    const [result] = await db.query(
      'INSERT INTO bookings (user_id, movie_id, seats, total_price, city, theatre_name, show_date, show_time, food_items) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, movie_id, seats, total_price, city || 'Delhi', theatre_name || 'Generic Cinema', show_date || new Date().toISOString().split('T')[0], show_time || '10:00 AM', food_items || '']
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
              b.city, b.theatre_name, b.show_date, b.show_time, b.food_items,
              m.title, m.genre, m.poster_url
       FROM bookings b
       JOIN movies m ON b.movie_id = m.movie_id
       WHERE b.user_id = ?
       ORDER BY b.booked_at DESC`,
      [req.user.id]
    );
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.addFoodToBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { food_items, extra_price } = req.body;
    const user_id = req.user.id;

    const [rows] = await db.query('SELECT food_items, total_price FROM bookings WHERE booking_id = ? AND user_id = ?', [id, user_id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }

    const currentFood = rows[0].food_items || '';
    const currentPrice = parseInt(rows[0].total_price) || 0;

    const newFood = currentFood ? `${currentFood}, ${food_items}` : food_items;
    const extraPriceParsed = parseInt(extra_price) || 0;
    const newPrice = currentPrice + extraPriceParsed;

    await db.query(
      'UPDATE bookings SET food_items = ?, total_price = ? WHERE booking_id = ?',
      [newFood, newPrice, id]
    );

    if (extraPriceParsed > 0) {
      await db.query(
        'INSERT INTO payments (booking_id, user_id, amount, method) VALUES (?, ?, ?, ?)',
        [id, user_id, extraPriceParsed, 'food-addon']
      );
    }

    res.json({ message: 'Food added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding food' });
  }
};