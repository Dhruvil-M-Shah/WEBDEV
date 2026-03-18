const router = require('express').Router();
const { createPayment } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createPayment);

module.exports = router;