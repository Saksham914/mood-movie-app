const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
console.log('MoodFlix API URL:', API_BASE_URL); // Debugging connection

export const movieService = {
    // Get movies by mood
    async getMoviesByMood(mood) {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/mood/${mood}`);
            if (!response.ok) throw new Error('Failed to fetch movies');
            return await response.json();
        } catch (error) {
            console.error('Error fetching movies by mood:', error);
            throw error;
        }
    },

    // Search movies
    async searchMovies(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/search/${query}`);
            if (!response.ok) throw new Error('Failed to search movies');
            return await response.json();
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    },

    // Get trending movies
    async getTrendingMovies() {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/trending`);
            if (!response.ok) throw new Error('Failed to fetch trending movies');
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            throw error;
        }
    },

    // Get top rated movies (for Matcher)
    async getTopRatedMovies() {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/top_rated`);
            if (!response.ok) throw new Error('Failed to fetch top rated movies');
            return await response.json();
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            throw error;
        }
    },

    // Get movie details
    async getMovieDetails(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/details/${id}`);
            if (!response.ok) throw new Error('Failed to fetch movie details');
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    }
};
