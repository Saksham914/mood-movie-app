import express from 'express';
import {
    getMoviesByMood,
    searchMovies,
    getTrendingMovies,
    getMovieDetails,
    getTopRatedMovies
} from '../controllers/moviesController.js';

const router = express.Router();

// Get movies by mood
router.get('/mood/:mood', getMoviesByMood);

// Search movies
router.get('/search/:query', searchMovies);

// Get trending movies
router.get('/trending', getTrendingMovies);

// Get top rated movies
router.get('/top_rated', getTopRatedMovies);

// Get movie details
router.get('/details/:id', getMovieDetails);

export default router;
