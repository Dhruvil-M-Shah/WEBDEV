const router = require('express').Router();
const { getBookedSeats, bookSeats } = require('../controllers/seatController');
const auth = require('../middleware/authMiddleware');

router.get('/:movie_id', getBookedSeats);
router.post('/book', auth, bookSeats);

module.exports = router;