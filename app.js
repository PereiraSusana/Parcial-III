const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'Parcial 3'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// all pets
app.get('/pets', (req, res) => {
  const sql = 'SELECT * FROM pets';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/pets/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM pets WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/add', (req, res) => {
  const sql = 'INSERT INTO pets SET ?';

  const petObj = {
    pet_id: req.body.pet_id,
    petName: req.body.petName,
    petAge: req.body.petAge
  };

  connection.query(sql, petObj, error => {
    if (error) throw error;
    res.send('pet created!');
  });
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { pet_id,petName, petAge } = req.body;
  const sql = `UPDATE pets SET name = '${pet_id}', petName='${petName}' , petAge='${petAge}' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('pet updated!');
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM pet WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete pet');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
