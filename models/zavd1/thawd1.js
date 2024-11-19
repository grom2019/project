const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'auth_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Middleware для перевірки JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token.');
    req.userId = decoded.id;
    next();
  });
}

// Реєстрація
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], (err, results) => {
    if (err) return res.status(500).send('There was a problem registering the user.');
    res.status(200).send('User registered successfully!');
  });
});

// Вхід
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    if (results.length === 0) return res.status(404).send('No user found.');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: 86400 }); // Expires in 24 hours

    res.status(200).send({ auth: true, token: token });
  });
});

// Закрита сторінка
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).send('This is a protected route. You are authenticated.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
