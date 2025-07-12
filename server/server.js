import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js'; // Central router file
import { sequelize } from './config/db.js'; // Sequelize connection

// Load .env variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// API Routes
app.use('/api', routes);

// Health check route
app.get('/', (req, res) => {
  res.send('🌍 ReWear backend is running');
});

// Connect to DB and Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL DB connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  }
};

startServer();
