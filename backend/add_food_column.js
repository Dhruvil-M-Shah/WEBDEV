require('dotenv').config();
const db = require('./config/db');

async function migrate() {
    try {
        console.log('Adding food_items column to bookings table...');
        await db.query(`ALTER TABLE bookings ADD COLUMN food_items VARCHAR(500) DEFAULT ''`);
        console.log('Successfully added food_items column!');
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Column food_items already exists. No action required.');
        } else {
            console.error('Migration error:', err);
        }
    } finally {
        process.exit();
    }
}

migrate();
