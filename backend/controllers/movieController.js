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
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    const [movies] = await db.query(
      'SELECT * FROM movies WHERE title LIKE ?',
      [`%${q}%`]
    );
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
exports.filterByGenre = async (req, res) => {
  try {
    const { genre } = req.query;
    const [movies] = await db.query(
      'SELECT * FROM movies WHERE genre LIKE ?',
      [`%${genre}%`]
    );
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};