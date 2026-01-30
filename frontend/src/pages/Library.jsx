import { useState } from 'react';
import { usePlaylists } from '../context/PlaylistContext';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

function Library() {
    const { playlists, createPlaylist, deletePlaylist, removeFromPlaylist } = usePlaylists();
    const [activeTab, setActiveTab] = useState('watchlist');
    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName);
            setNewPlaylistName('');
            setIsCreating(false);
        }
    };

    const currentPlaylist = playlists.find(p => p.id === activeTab) || playlists[0];

    return (
        <div className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">My Library</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
                    {/* Add New */}
                    <button
                        onClick={() => setIsCreating(true)}
                        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        <span>+</span> New Playlist
                    </button>

                    {isCreating && (
                        <form onSubmit={handleCreate} className="bg-white/5 p-4 rounded-xl border border-white/10 animate-fade-in">
                            <input
                                autoFocus
                                type="text"
                                value={newPlaylistName}
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                placeholder="Playlist name..."
                                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-sm text-white mb-2 focus:outline-none focus:border-purple-500"
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-purple-600 text-xs py-1.5 rounded-lg">Create</button>
                                <button type="button" onClick={() => setIsCreating(false)} className="flex-1 bg-white/10 text-xs py-1.5 rounded-lg">Cancel</button>
                            </div>
                        </form>
                    )}

                    {/* Links */}
                    <div className="space-y-2">
                        {playlists.map(playlist => (
                            <button
                                key={playlist.id}
                                onClick={() => setActiveTab(playlist.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex justify-between group ${activeTab === playlist.id
                                        ? 'bg-white/10 text-white font-medium'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span>{playlist.name}</span>
                                <span className="text-xs opacity-50 bg-black/20 px-2 py-0.5 rounded-full">
                                    {playlist.movies.length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">{currentPlaylist.name}</h2>
                            <p className="text-gray-400 text-sm">
                                {currentPlaylist.movies.length} {currentPlaylist.movies.length === 1 ? 'movie' : 'movies'}
                            </p>
                        </div>

                        {!currentPlaylist.system && (
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this playlist?')) {
                                        deletePlaylist(currentPlaylist.id);
                                        setActiveTab('watchlist');
                                    }
                                }}
                                className="text-red-400 text-sm hover:text-red-300 transition-colors"
                            >
                                Delete Playlist
                            </button>
                        )}
                    </div>

                    {currentPlaylist.movies.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                            <div className="text-6xl mb-4">📺</div>
                            <h3 className="text-xl font-semibold mb-2">It's quiet here</h3>
                            <p className="text-gray-400 mb-6">Start adding movies to your playlist!</p>
                            <Link to="/discover" className="btn-primary">Browse Movies</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentPlaylist.movies.map(movie => (
                                <div key={movie.id} className="relative group">
                                    <MovieCard movie={movie} />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromPlaylist(currentPlaylist.id, movie.id);
                                        }}
                                        className="absolute top-2 right-2 z-10 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                                        title="Remove from playlist"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Library;
