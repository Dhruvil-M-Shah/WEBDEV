const router = require('express').Router();
const { getAllMovies, searchMovies, filterByGenre } = require('../controllers/movieController');

router.get('/search', searchMovies);
router.get('/filter', filterByGenre);
router.get('/', getAllMovies);

module.exports = router;
