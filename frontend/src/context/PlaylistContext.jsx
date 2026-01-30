import { createContext, useContext, useState, useEffect } from 'react';

const PlaylistContext = createContext();

export function usePlaylists() {
    return useContext(PlaylistContext);
}

export function PlaylistProvider({ children }) {
    const [playlists, setPlaylists] = useState(() => {
        const saved = localStorage.getItem('my_playlists');
        return saved ? JSON.parse(saved) : [
            { id: 'watchlist', name: 'Watchlist', movies: [], system: true },
            { id: 'favorites', name: 'Favorites', movies: [], system: true }
        ];
    });

    useEffect(() => {
        localStorage.setItem('my_playlists', JSON.stringify(playlists));
    }, [playlists]);

    const createPlaylist = (name) => {
        const newPlaylist = {
            id: Date.now().toString(),
            name,
            movies: [],
            createdAt: new Date().toISOString()
        };
        setPlaylists([...playlists, newPlaylist]);
    };

    const deletePlaylist = (id) => {
        setPlaylists(prev => prev.filter(p => p.id !== id));
    };

    const addToPlaylist = (playlistId, movie) => {
        setPlaylists(prev => prev.map(p => {
            if (p.id === playlistId) {
                // Check if movie already exists
                if (p.movies.some(m => m.id === movie.id)) return p;
                return { ...p, movies: [movie, ...p.movies] };
            }
            return p;
        }));
    };

    const removeFromPlaylist = (playlistId, movieId) => {
        setPlaylists(prev => prev.map(p => {
            if (p.id === playlistId) {
                return { ...p, movies: p.movies.filter(m => m.id !== movieId) };
            }
            return p;
        }));
    };

    const isInPlaylist = (playlistId, movieId) => {
        const playlist = playlists.find(p => p.id === playlistId);
        return playlist ? playlist.movies.some(m => m.id === movieId) : false;
    };

    return (
        <PlaylistContext.Provider value={{
            playlists,
            createPlaylist,
            deletePlaylist,
            addToPlaylist,
            removeFromPlaylist,
            isInPlaylist
        }}>
            {children}
        </PlaylistContext.Provider>
    );
}
