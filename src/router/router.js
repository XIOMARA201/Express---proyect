const express = require('express');
const router = express.Router();
const users = require('./users'); 
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  }

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Incorrect credentials' });
    }
  
    // Create a JWT token
    const token = jwt.sign({ username, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token });
  });

  router.get('/protected', verifyToken, (req, res) => {
    // The protected route is only accessible if the token is valid
    const userRol = req.user.rol;
  
    if (userRol === 'admin') {
      res.json({ message: `Protected route, user authenticated as administrator (${req.user.username})` });
    } else if (userRol === 'user') {
      res.json({ message: `Protected route, user authenticated as user (${req.user.username})` });
    } else {
      res.status(401).json({ message: 'Access not allowed' });
    }
  });

  module.exports = router;
  