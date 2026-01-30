import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MoodResults from './pages/MoodResults';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';

import Landing from './pages/Landing';
import Trending from './pages/Trending';
import About from './pages/About';
import Library from './pages/Library';
import Matcher from './pages/Matcher';
import { PlaylistProvider } from './context/PlaylistContext';

function App() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Check localStorage for dark mode preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(JSON.parse(savedMode));
        }
    }, []);

    useEffect(() => {
        // Apply dark mode class to html element
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <PlaylistProvider>
            <Router>
                <div className="min-h-screen">
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/discover" element={<Home />} />
                        <Route path="/mood/:mood" element={<MoodResults />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/search/:query" element={<SearchResults />} />
                        <Route path="/trending" element={<Trending />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/matcher" element={<Matcher />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </Router>
        </PlaylistProvider>
    );
}

export default App;
