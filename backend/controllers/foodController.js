const db = require('../config/db');

// ── Public Food Items ──
exports.getAllFood = async (req, res) => {
    try {
        const [foodItems] = await db.query('SELECT * FROM food_items ORDER BY id ASC');
        res.json(foodItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch food items' });
    }
};
