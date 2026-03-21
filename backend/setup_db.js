const db = require('./config/db');

async function setup() {
    try {
        console.log('Creating admins table...');
        await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        admin_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Admins table ready.');

        const [rows] = await db.query('SELECT * FROM admins WHERE email = "admin@movietickets.com"');
        if (rows.length === 0) {
            console.log('Inserting default admin...');
            await db.query(`
        INSERT INTO admins (name, email, password)
        VALUES ('Admin', 'admin@movietickets.com', '$2b$10$Xu/IKoSl6Emd0xbsQP.EDu6j0jOXFwuBUS0c1d1GBB27xwY76DLfi')
      `);
            console.log('Default admin inserted!');
        } else {
            console.log('Default admin already exists.');
        }
    } catch (error) {
        console.error('Error setting up DB:', error);
    } finally {
        process.exit(0);
    }
}

setup();
