const db = require('./config/db');

async function updateSchema() {
    try {
        await db.query("ALTER TABLE bookings MODIFY COLUMN status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending'");
        console.log('Schema updated successfully');
    } catch (e) {
        console.error('Error updating schema:', e);
    } finally {
        process.exit(0);
    }
}

updateSchema();
