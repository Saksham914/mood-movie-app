import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { movieService } from '../services/api';

function SearchResults() {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        searchMovies();
    }, [query]);

    const searchMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await movieService.searchMovies(query);
            setMovies(data.movies);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 pt-32 pb-20">
            {/* Back Button - Top Left */}
            <Link
                to="/discover"
                className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full
                         hover:bg-white/10 transition-all duration-300 hover:scale-105
                         group shadow-lg mb-8"
            >
                <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span className="font-medium">Back to Discover</span>
            </Link>

            {/* Header */}
            <div className="mb-12 animate-fade-in">

                <div className="glass-effect p-8 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                        Search Results
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Showing results for: <span className="font-semibold text-purple-400">"{query}"</span>
                    </p>
                </div>
            </div>

            {/* Loading State */}
            {loading && <Loader />}

            {/* Error State */}
            {error && (
                <ErrorMessage
                    message={error}
                    onRetry={searchMovies}
                />
            )}

            {/* Movies Grid */}
            {!loading && !error && movies.length > 0 && (
                <>
                    <p className="text-gray-300 mb-6">
                        Found {movies.length} result{movies.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </>
            )}

            {/* No Results */}
            {!loading && !error && movies.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">😕</div>
                    <h3 className="text-2xl font-bold mb-2">No movies found</h3>
                    <p className="text-gray-300">Try searching with different keywords</p>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
