require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
const db = require('./models'); // ✅ Import db from models/index.js

app.use(express.json()); // To parse JSON request bodies

// Sample test route
app.get('/', (req, res) => {
  res.send('ReWear API is working!');
});

// Test database connection
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to DB');

    // Sync tables and then start server
    db.sequelize.sync({ alter: true }).then(() => {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    });

  })
  .catch(err => {
    console.error(' DB Connection failed:', err);
  });

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));
