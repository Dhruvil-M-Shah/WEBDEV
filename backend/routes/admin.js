const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const {
    login,
    getStats,
    getAllUsers,
    getAllBookings,
    getAllPayments,
    getRevenue,
    addMovie,
    updateMovie,
    deleteMovie,
    addFood,
    updateFood,
    deleteFood
} = require('../controllers/adminController');

// Public — admin login
router.post('/login', login);

// Protected — all routes below require admin JWT
router.get('/stats', adminAuth, getStats);
router.get('/users', adminAuth, getAllUsers);
router.get('/bookings', adminAuth, getAllBookings);
router.get('/payments', adminAuth, getAllPayments);
router.get('/revenue', adminAuth, getRevenue);

// Movie CRUD
router.post('/movies', adminAuth, addMovie);
router.put('/movies/:id', adminAuth, updateMovie);
router.delete('/movies/:id', adminAuth, deleteMovie);

// Food CRUD
router.post('/food', adminAuth, addFood);
router.put('/food/:id', adminAuth, updateFood);
router.delete('/food/:id', adminAuth, deleteFood);

module.exports = router;
