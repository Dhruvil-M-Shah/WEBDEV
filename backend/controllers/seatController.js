const db = require('../config/db');

exports.getBookedSeats = async (req, res) => {
  try {
    const { movie_id } = req.params;
    const [seats] = await db.query(
      'SELECT seat_label FROM seats WHERE movie_id = ? AND is_booked = TRUE',
      [movie_id]
    );
    res.json(seats.map(s => s.seat_label));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.bookSeats = async (req, res) => {
  try {
    const { movie_id, seats } = req.body;
    const user_id = req.user.id;

    // Check if any seat is already booked
    const seatList = seats.split(',').map(s => s.trim());
    
    for (let seat of seatList) {
      const [existing] = await db.query(
        'SELECT * FROM seats WHERE movie_id = ? AND seat_label = ? AND is_booked = TRUE',
        [movie_id, seat]
      );
      if (existing.length > 0) {
        return res.status(400).json({ 
          message: `Seat ${seat} is already booked!` 
        });
      }
    }

    // Book all seats
    for (let seat of seatList) {
      await db.query(
        'INSERT INTO seats (movie_id, seat_label, is_booked, booked_by) VALUES (?, ?, TRUE, ?) ON DUPLICATE KEY UPDATE is_booked = TRUE, booked_by = ?',
        [movie_id, seat, user_id, user_id]
      );
    }

    res.json({ message: 'Seats booked successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};