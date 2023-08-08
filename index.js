const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Jason_1998',
    database: 'webServerdb'
});

db.connect((err) => {
    if (err){
        console.log('Database connection error: ', err);
        return;
    } else {
        console.log('Connected to the database');
    }
});

// routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/home.html');
});

app.get('/about', (req,res) => {
    res.sendFile(__dirname + 'static/about.html')
});

app.get('/products', (req,res) => {
    db.query('SELECT * FROM products', (err, results) =>{
    if (err) {
        console.error('Error fetching products', err);
        res.statsue(500).send('Internal Server Error');
        return;
    }
    res.sendFile(__dirname + 'static/products.html')
})
})

app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    // Fetch and display single product based on productId from the database
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, result) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.sendFile(__dirname + '/public/product.html');
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });