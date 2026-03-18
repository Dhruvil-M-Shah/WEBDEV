const router = require('express').Router();
const { getAllMovies } = require('../controllers/movieController');

router.get('/', getAllMovies);

module.exports = router;