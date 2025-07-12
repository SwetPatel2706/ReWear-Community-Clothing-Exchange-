require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
const db = require('./models'); // Sequelize models

// Middleware
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form-data

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Basic test route
app.get('/', (req, res) => {
  res.send('ReWear API is working!');
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes')); 
app.use('/api/items', require('./routes/item.routes'));
app.use('/api/swaps', require('./routes/swap.routes')); // ✅ Swap routes

// DB connection and server start
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to DB');

    // Use alter:true to update DB schema without data loss
    db.sequelize.sync({ alter: true }).then(() => {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log('📦 DB structure updated without data loss.');
      });
    });

  })
  .catch(err => {
    console.error('❌ DB Connection failed:', err);
  });
