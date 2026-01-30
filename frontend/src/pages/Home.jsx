import { useState, useEffect } from 'react';
import MoodSelector from '../components/MoodSelector';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { movieService } from '../services/api';

function Home() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastMood, setLastMood] = useState(null);

    useEffect(() => {
        fetchTrendingMovies();
        const savedMood = localStorage.getItem('lastMood');
        if (savedMood) setLastMood(savedMood);
    }, []);

    const fetchTrendingMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await movieService.getTrendingMovies();
            setTrendingMovies(data.movies.slice(0, 12));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 pt-32 pb-20">
            {/* Minimal Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-fade-in delay-100">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                        Discover
                    </h1>
                    <p className="text-gray-400 text-lg font-light">
                        Find your next favorite story.
                    </p>
                </div>

                {lastMood && (
                    <div className="text-sm text-gray-400 animate-fade-in delay-200">
                        Last vibe: <span className="text-white font-medium capitalize">{lastMood}</span>
                    </div>
                )}
            </div>

            {/* Mood Selector - Clean */}
            <div className="mb-24">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Browse by Mood</h2>
                <MoodSelector />
            </div>

            {/* Trending Section - Minimal Grid */}
            <div className="animate-slide-up delay-300">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Trending Now</h2>
                    <button className="text-sm text-purple-400 hover:text-white transition-colors">View All →</button>
                </div>

                {loading && <Loader />}

                {error && <ErrorMessage message={error} onRetry={fetchTrendingMovies} />}

                {!loading && !error && trendingMovies.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {trendingMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
