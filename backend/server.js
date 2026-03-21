const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/movies', require('./routes/movies'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/seats', require('./routes/seats'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/food', require('./routes/food'));

app.get('/', (req, res) => {
  res.send('Movie Booking Backend is running!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});