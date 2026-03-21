require('dotenv').config();
const db = require('./config/db');

const defaultFoodItems = [
    { name: 'Large Popcorn + 2 Cokes', desc: 'Salted popcorn with 2 regular fountain drinks', price: 450, icon: '🍿' },
    { name: 'Nachos Combo', desc: 'Crispy nachos with jalapeños and cheese dip', price: 350, icon: '🧀' },
    { name: 'Regular Popcorn', desc: 'Classic salted popcorn', price: 250, icon: '🍿' },
    { name: 'Caramel Popcorn', desc: 'Sweet and crunchy caramel coated popcorn', price: 280, icon: '🍿' },
    { name: 'Cold Coffee', desc: 'Thick and creamy cold coffee', price: 180, icon: '☕' },
    { name: 'Fountain Coke', desc: 'Regular 400ml Coke', price: 150, icon: '🥤' }
];

async function setupFoodTable() {
    try {
        console.log('Creating food_items table...');
        await db.query(`
            CREATE TABLE IF NOT EXISTS food_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                desc_text TEXT NOT NULL,
                price INT NOT NULL,
                icon VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('food_items table created/verified.');

        // Check if empty before inserting defaults
        const [rows] = await db.query('SELECT COUNT(*) as count FROM food_items');
        if (rows[0].count === 0) {
            console.log('Inserting default food items...');
            for (const item of defaultFoodItems) {
                await db.query(
                    'INSERT INTO food_items (name, desc_text, price, icon) VALUES (?, ?, ?, ?)',
                    [item.name, item.desc, item.price, item.icon]
                );
            }
            console.log('Default food items inserted.');
        } else {
            console.log('food_items table already contains data. Skipped defaults.');
        }

    } catch (err) {
        console.error('Migration error:', err);
    } finally {
        process.exit();
    }
}

setupFoodTable();
