import { useState, useEffect } from 'react';
import { usePlaylists } from '../context/PlaylistContext';
import { movieService } from '../services/api';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function Matcher() {
    const { addToPlaylist, playlists } = usePlaylists(); // Add to favorites/watchlist
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [lastAction, setLastAction] = useState(null); // 'like', 'pass', 'watch'

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const data = await movieService.getTopRatedMovies();
            // Shuffle them a bit? No need if backend is random page
            setMovies(data.movies);
            setCurrentIndex(0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSwipe = (action) => {
        const currentMovie = movies[currentIndex];

        if (action === 'like') {
            // Add to defaults
            addToPlaylist('watchlist', currentMovie);
        }

        setLastAction(action);

        // Advance
        if (currentIndex < movies.length - 1) {
            setTimeout(() => {
                setLastAction(null);
                setCurrentIndex(prev => prev + 1);
            }, 300); // Wait for animation
        } else {
            // End of stack
            fetchMovies();
        }
    };

    if (loading && movies.length === 0) return <Loader />;

    const currentMovie = movies[currentIndex];

    if (!currentMovie) return <div className="text-center pt-32">No more movies!</div>;

    const posterUrl = currentMovie.poster_path
        ? `${IMAGE_BASE_URL}${currentMovie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <div className="container mx-auto px-6 pt-24 pb-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Movie Matcher
            </h1>

            <div className="relative w-full max-w-sm aspect-[2/3]">
                {/* The Card */}
                <div
                    className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform ${lastAction === 'pass' ? '-translate-x-full rotate-[-20deg] opacity-0' :
                            lastAction === 'like' ? 'translate-x-full rotate-[20deg] opacity-0' :
                                'scale-100'
                        }`}
                >
                    <img
                        src={posterUrl}
                        alt={currentMovie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                    <div className="absolute bottom-0 left-0 w-full p-8 pb-10">
                        <h2 className="text-3xl font-bold text-white mb-2 leading-tight shadow-md">
                            {currentMovie.title}
                        </h2>
                        <div className="flex items-center gap-3 mb-4 text-sm font-medium">
                            <span className="bg-yellow-500/80 text-black px-2 py-0.5 rounded">
                                ★ {currentMovie.vote_average.toFixed(1)}
                            </span>
                            <span>{currentMovie.release_date?.split('-')[0]}</span>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-3 mb-6">
                            {currentMovie.overview}
                        </p>
                    </div>
                </div>

                {/* Overlays for feedback */}
                {lastAction === 'like' && (
                    <div className="absolute top-10 left-10 border-4 border-green-500 text-green-500 font-bold text-4xl px-4 py-2 rounded-lg -rotate-12 bg-black/20 backdrop-blur-sm z-10">
                        LIKE
                    </div>
                )}
                {lastAction === 'pass' && (
                    <div className="absolute top-10 right-10 border-4 border-red-500 text-red-500 font-bold text-4xl px-4 py-2 rounded-lg rotate-12 bg-black/20 backdrop-blur-sm z-10">
                        NOPE
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 mt-10">
                <button
                    onClick={() => handleSwipe('pass')}
                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-red-500 text-3xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-110 shadow-lg"
                >
                    ✕
                </button>

                <Link
                    to={`/movie/${currentMovie.id}`}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xl flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all hover:scale-110"
                    title="View Details"
                >
                    ℹ
                </Link>

                <button
                    onClick={() => handleSwipe('like')}
                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-green-500 text-3xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all hover:scale-110 shadow-lg"
                >
                    ♥
                </button>
            </div>

            <p className="mt-8 text-gray-500 text-sm">
                Like a movie to add it to your Watchlist.
            </p>
        </div>
    );
}

export default Matcher;
