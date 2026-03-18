const router = require('express').Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createBooking);
router.get('/my', auth, getMyBookings);

module.exports = router;