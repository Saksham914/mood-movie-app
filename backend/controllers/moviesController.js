import fetch from 'node-fetch';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Mood to genre mapping
const moodGenreMap = {
    happy: [35, 12], // Comedy, Adventure
    sad: [18], // Drama
    romantic: [10749], // Romance
    angry: [28, 53], // Action, Thriller
    chill: [10751, 10770], // Family, TV Movie (closest to slice of life)
    motivational: [99, 36] // Documentary (Biography), History (Sports-related)
};

// Helper function to make TMDB API calls
async function fetchFromTMDB(endpoint) {
    const TMDB_API_KEY = process.env.TMDB_API_KEY; // Get API key here, not at module load
    const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${TMDB_API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('TMDB fetch error:', error);
        throw error;
    }
}

// Get movies by mood
export async function getMoviesByMood(req, res) {
    try {
        const { mood } = req.params;
        const moodLower = mood.toLowerCase();

        if (!moodGenreMap[moodLower]) {
            return res.status(400).json({
                error: 'Invalid mood',
                validMoods: Object.keys(moodGenreMap)
            });
        }

        const genres = moodGenreMap[moodLower];
        const genreString = genres.join(',');

        const data = await fetchFromTMDB(
            `/discover/movie?with_genres=${genreString}&sort_by=popularity.desc&page=1`
        );

        res.json({
            mood: moodLower,
            genres,
            movies: data.results
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch movies',
            message: error.message
        });
    }
}

// Search movies by query
export async function searchMovies(req, res) {
    try {
        const { query } = req.params;

        if (!query || query.trim() === '') {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const data = await fetchFromTMDB(
            `/search/movie?query=${encodeURIComponent(query)}&page=1`
        );

        res.json({
            query,
            movies: data.results
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to search movies',
            message: error.message
        });
    }
}

// Get trending movies
export async function getTrendingMovies(req, res) {
    try {
        const data = await fetchFromTMDB('/trending/movie/week');

        res.json({
            movies: data.results
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch trending movies',
            message: error.message
        });
    }
}

// Get top rated movies
export async function getTopRatedMovies(req, res) {
    try {
        const page = Math.floor(Math.random() * 10) + 1; // Random page for variety
        const data = await fetchFromTMDB(`/movie/top_rated?page=${page}`);

        res.json({
            movies: data.results
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch top rated movies',
            message: error.message
        });
    }
}

// Get movie details
export async function getMovieDetails(req, res) {
    try {
        const { id } = req.params;

        const data = await fetchFromTMDB(`/movie/${id}?append_to_response=credits,videos`);

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch movie details',
            message: error.message
        });
    }
}
