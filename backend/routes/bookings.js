const router = require('express').Router();
const { createBooking, getMyBookings, addFoodToBooking } = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createBooking);
router.get('/my', auth, getMyBookings);
router.put('/:id/food', auth, addFoodToBooking);

module.exports = router;