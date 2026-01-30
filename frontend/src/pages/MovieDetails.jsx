import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { movieService } from '../services/api';
import { usePlaylists } from '../context/PlaylistContext';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playlists, addToPlaylist, isInPlaylist, removeFromPlaylist, createPlaylist } = usePlaylists();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);

    // Playlist Modal State
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await movieService.getMovieDetails(id);
            setMovie(data);

            // Find trailer
            if (data.videos && data.videos.results) {
                const trailer = data.videos.results.find(
                    vid => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
                );
                if (trailer) setTrailerKey(trailer.key);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} onRetry={fetchMovieDetails} />;
    if (!movie) return null;

    const backdropUrl = movie.backdrop_path
        ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
        : null;

    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750/1f2937/ffffff?text=No+Image';

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'N/A';

    const cast = movie.credits && movie.credits.cast ? movie.credits.cast.slice(0, 10) : [];

    const handleCreatePlaylist = (e) => {
        e.preventDefault();
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName);
            setNewPlaylistName('');
        }
    };

    return (
        <div className="animate-fade-in relative min-h-screen pb-20">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-24 left-6 z-40 inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full
                         hover:bg-white/10 transition-all duration-300 hover:scale-105 group shadow-lg"
            >
                <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span className="font-medium hidden md:inline">Back</span>
            </button>

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                {backdropUrl ? (
                    <>
                        <img
                            src={backdropUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-900"></div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 pb-32 md:pb-12 bg-gradient-to-t from-[#050505] to-transparent">
                    <h1 className="md:hidden text-4xl font-bold text-white mb-2 shadow-sm">{movie.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10 -mt-32">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {/* Left Column */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-full rounded-2xl shadow-2xl border border-white/10"
                        />

                        {trailerKey && (
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                <span className="text-xl">▶</span> Watch Trailer
                            </button>
                        )}

                        {movie.homepage && (
                            <a
                                href={movie.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all text-center border border-white/10"
                            >
                                Visit Website ↗
                            </a>
                        )}

                        <button
                            onClick={() => setShowPlaylistModal(true)}
                            className="w-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 font-semibold py-3 rounded-xl transition-all border border-purple-500/30 flex items-center justify-center gap-2"
                        >
                            <span>+</span> Add to Library
                        </button>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-2 pt-4 md:pt-12">
                        <h1 className="hidden md:block text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="text-xl text-purple-300 italic mb-8 font-light">
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-300 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm inline-flex">
                            <div className="flex items-center gap-2 text-yellow-500">
                                <span className="text-2xl">★</span>
                                <span className="text-xl font-bold text-white">{rating}</span>
                                <span className="text-xs text-gray-400">/10</span>
                            </div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="text-lg font-medium">{runtime}</div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="text-lg font-medium">{releaseYear}</div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="mb-10">
                            <h3 className="text-white text-lg font-semibold mb-3">Synopsys</h3>
                            <p className="text-gray-300 text-lg leading-relaxed font-light">
                                {movie.overview || 'No overview available.'}
                            </p>
                        </div>

                        {cast.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-white text-lg font-semibold mb-4">Top Cast</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {cast.map(actor => (
                                        <div key={actor.id} className="text-center group">
                                            <div className="w-full aspect-square mb-2 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-purple-500 transition-colors">
                                                <img
                                                    src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : 'https://via.placeholder.com/150?text=No+Img'}
                                                    alt={actor.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <p className="text-white font-medium text-sm truncate">{actor.name}</p>
                                            <p className="text-gray-400 text-xs truncate">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                            {movie.budget > 0 && (
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Budget</p>
                                    <p className="font-medium text-lg">${(movie.budget / 1000000).toFixed(1)}M</p>
                                </div>
                            )}
                            {movie.revenue > 0 && (
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Box Office</p>
                                    <p className="font-medium text-lg">${(movie.revenue / 1000000).toFixed(1)}M</p>
                                </div>
                            )}
                            {movie.vote_count > 0 && (
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Vote Count</p>
                                    <p className="font-medium text-lg">{movie.vote_count.toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && trailerKey && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                            ✕
                        </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Playlist Modal */}
            {showPlaylistModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-[#1a1a1a] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Add to Library</h3>
                            <button onClick={() => setShowPlaylistModal(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>

                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-2">
                            {playlists.map(playlist => {
                                const inList = isInPlaylist(playlist.id, movie.id);
                                return (
                                    <button
                                        key={playlist.id}
                                        onClick={() => {
                                            if (inList) removeFromPlaylist(playlist.id, movie.id);
                                            else addToPlaylist(playlist.id, movie);
                                        }}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${inList
                                                ? 'bg-purple-600/20 border-purple-500/50 text-white'
                                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        <span className="font-medium">{playlist.name}</span>
                                        {inList && <span className="text-purple-400">✓ Added</span>}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="p-6 bg-black/20 border-t border-white/10">
                            <form onSubmit={handleCreatePlaylist} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newPlaylistName}
                                    onChange={(e) => setNewPlaylistName(e.target.value)}
                                    placeholder="New playlist name..."
                                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                                    disabled={!newPlaylistName.trim()}
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
