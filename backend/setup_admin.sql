-- Run this SQL in your MySQL database to create the admins table
-- Connect to your database and execute:

CREATE TABLE IF NOT EXISTS admins (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin (password: admin123)
-- The bcrypt hash below = 'admin123'
-- You can change the password after first login
INSERT INTO admins (name, email, password)
VALUES ('Admin', 'admin@movietickets.com', '$2b$10$Xu/IKoSl6Emd0xbsQP.EDu6j0jOXFwuBUS0c1d1GBB27xwY76DLfi');
