const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// In-memory user store
const users = [];

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).send({ message: 'User already exists' });
  }

  const newUser = { username, password };
  users.push(newUser);

  res.status(201).send({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  res.status(200).send({ message: 'Login successful' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});