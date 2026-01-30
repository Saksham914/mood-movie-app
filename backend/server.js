import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './routes/movies.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug: Check if API key is loaded
console.log('TMDB_API_KEY loaded:', process.env.TMDB_API_KEY ? 'Yes ✓' : 'No ✗');
if (!process.env.TMDB_API_KEY) {
  console.error('⚠️  WARNING: TMDB_API_KEY is not set in .env file!');
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', moviesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
