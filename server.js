const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
app.use(express.json());
app.use(express.static(__dirname));

// Show POS screen on main link
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products ORDER BY id DESC', (err, results) => {
    if (err) { console.log(err); return res.status(500).json({ error: 'Database Error' }); }
    res.json(results);
  });
});

// Add new product
app.post('/api/products', (req, res) => {
  const { name, price, stock } = req.body;
  db.query('INSERT INTO products (name, price, stock) VALUES (?,?,?)', [name, price, stock || 0], (err, result) => {
    if (err) { console.log(err); return res.status(500).json({ error: 'Database Error' }); }
    res.json({ id: result.insertId, name, price, stock });
  });
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Database Error' });
    res.json({ success: true });
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
