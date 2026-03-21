const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ── Admin Login ──
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
        const admin = rows[0];
        if (!admin || !(await bcrypt.compare(password, admin.password)))
            return res.status(400).json({ message: 'Invalid admin credentials' });

        const token = jwt.sign(
            { id: admin.admin_id, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ token, admin: { id: admin.admin_id, name: admin.name, email: admin.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// ── Dashboard Stats ──
exports.getStats = async (req, res) => {
    try {
        const [[{ total_movies }]] = await db.query('SELECT COUNT(*) AS total_movies FROM movies');
        const [[{ total_users }]] = await db.query('SELECT COUNT(*) AS total_users FROM users');
        const [[{ total_bookings }]] = await db.query('SELECT COUNT(*) AS total_bookings FROM bookings');
        const [[{ total_revenue }]] = await db.query('SELECT COALESCE(SUM(amount), 0) AS total_revenue FROM payments WHERE status = "success"');

        res.json({ total_movies, total_users, total_bookings, total_revenue });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
};

// ── All Users ──
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT user_id, name, email, phone, created_at FROM users ORDER BY created_at DESC');
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// ── All Bookings ──
exports.getAllBookings = async (req, res) => {
    try {
        const [bookings] = await db.query(
            `SELECT b.booking_id, b.seats, b.total_price, b.status, b.booked_at,
              b.city, b.theatre_name, b.show_date, b.show_time, b.food_items,
              u.name AS user_name, u.email AS user_email,
              m.title, m.genre
       FROM bookings b
       JOIN users u ON b.user_id = u.user_id
       JOIN movies m ON b.movie_id = m.movie_id
       ORDER BY b.booked_at DESC`
        );
        res.json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
};

// ── All Payments ──
exports.getAllPayments = async (req, res) => {
    try {
        const [payments] = await db.query(
            `SELECT p.payment_id, p.amount, p.method, p.status, p.created_at,
              u.name AS user_name,
              m.title
       FROM payments p
       JOIN users u ON p.user_id = u.user_id
       JOIN bookings b ON p.booking_id = b.booking_id
       JOIN movies m ON b.movie_id = m.movie_id
       ORDER BY p.created_at DESC`
        );
        res.json(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch payments' });
    }
};

// ── Total Revenue ──
exports.getRevenue = async (req, res) => {
    try {
        const [[{ total }]] = await db.query('SELECT COALESCE(SUM(amount), 0) AS total FROM payments WHERE status = "success"');
        res.json({ total_revenue: total });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch revenue' });
    }
};

// ── Add Movie ──
exports.addMovie = async (req, res) => {
    try {
        const { title, genre, language, duration, rating, censor, synopsis, poster_url, trailer, hero_image } = req.body;
        const parsedDuration = parseInt(duration) || null;
        const parsedRating = parseFloat(rating) || null;

        const [result] = await db.query(
            `INSERT INTO movies (title, genre, language, duration, rating, censor, synopsis, poster_url, trailer, hero_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, genre, language, parsedDuration, parsedRating, censor, synopsis, poster_url, trailer, hero_image || null]
        );
        res.status(201).json({ message: 'Movie added', movie_id: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Failed to add movie' });
    }
};

// ── Edit Movie ──
exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, language, duration, rating, censor, synopsis, poster_url, trailer, hero_image } = req.body;
        const parsedDuration = parseInt(duration) || null;
        const parsedRating = parseFloat(rating) || null;

        const [result] = await db.query(
            `UPDATE movies SET title=?, genre=?, language=?, duration=?, rating=?, censor=?, synopsis=?, poster_url=?, trailer=?, hero_image=?
       WHERE movie_id=?`,
            [title, genre, language, parsedDuration, parsedRating, censor, synopsis, poster_url, trailer, hero_image || null, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Failed to update movie' });
    }
};

// ── Delete Movie ──
exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        // First, delete related payments (which depend on bookings)
        await db.query('DELETE FROM payments WHERE booking_id IN (SELECT booking_id FROM bookings WHERE movie_id = ?)', [id]);

        // Next, delete associated seats
        await db.query('DELETE FROM seats WHERE movie_id = ?', [id]);

        // Then, delete associated bookings
        await db.query('DELETE FROM bookings WHERE movie_id = ?', [id]);

        // Finally, delete the movie
        const [result] = await db.query('DELETE FROM movies WHERE movie_id = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie and associated records deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Failed to delete movie' });
    }
};

// ── Add Food Item ──
exports.addFood = async (req, res) => {
    try {
        const { name, desc_text, price, icon } = req.body;
        const parsedPrice = parseInt(price) || 0;

        const [result] = await db.query(
            `INSERT INTO food_items (name, desc_text, price, icon) VALUES (?, ?, ?, ?)`,
            [name, desc_text, parsedPrice, icon || '🍔']
        );
        res.status(201).json({ message: 'Food item added', id: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Failed to add food item' });
    }
};

// ── Edit Food Item ──
exports.updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, desc_text, price, icon } = req.body;
        const parsedPrice = parseInt(price) || 0;

        const [result] = await db.query(
            `UPDATE food_items SET name=?, desc_text=?, price=?, icon=? WHERE id=?`,
            [name, desc_text, parsedPrice, icon || '🍔', id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Food item not found' });
        res.json({ message: 'Food item updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Failed to update food item' });
    }
};

// ── Delete Food Item ──
exports.deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM food_items WHERE id = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Food item not found' });
        res.json({ message: 'Food item deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Failed to delete food item' });
    }
};
