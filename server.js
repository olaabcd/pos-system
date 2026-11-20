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

db.query(`CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  stock INT DEFAULT 0
)`, (err) => {
  if (err) console.log(err);
  else console.log('Products table ready');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
