import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { movieService } from '../services/api';

function Trending() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        try {
            setLoading(true);
            const data = await movieService.getTrendingMovies();
            // The API returns { movies: [...] }
            setMovies(data.movies || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 pt-32 pb-20">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Trending Now</h1>
                <p className="text-gray-400">See what everyone is watching right now.</p>
            </div>

            {loading && <Loader />}
            {error && <ErrorMessage message={error} onRetry={fetchTrending} />}

            {!loading && !error && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Trending;
