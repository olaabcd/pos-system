const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Test - check if server is running
app.get('/', (req, res) => {
  res.send('POS Server is Running!');
});

// Get all products from MySQL
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Database Error' });
      return;
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
