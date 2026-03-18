const db = require('../config/db');

exports.getAllMovies = async (req, res) => {
  try {
    const [movies] = await db.query('SELECT * FROM movies');
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};