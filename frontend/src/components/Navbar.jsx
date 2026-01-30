import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar({ darkMode, setDarkMode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`);
            setSearchQuery('');
        }
    };

    const isLanding = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 isolate ${scrolled ? 'py-4' : 'py-6'
            }`}>
            <div className="container mx-auto px-6">
                <div className={`mx-auto max-w-5xl glass-effect rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent'
                    }`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🎬</span>
                        <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                            MoodFlix
                        </span>
                    </Link>

                    {/* Center Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/discover"
                            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/discover' ? 'text-white' : 'text-gray-400'
                                }`}
                        >
                            Discover
                        </Link>
                        <Link
                            to="/trending"
                            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/trending' ? 'text-white' : 'text-gray-400'}`}
                        >
                            Trending
                        </Link>
                        <Link
                            to="/library"
                            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/library' ? 'text-white' : 'text-gray-400'}`}
                        >
                            Library
                        </Link>
                        <Link
                            to="/matcher"
                            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/matcher' ? 'text-white' : 'text-gray-400'}`}
                        >
                            Matcher
                        </Link>
                        <Link
                            to="/about"
                            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/about' ? 'text-white' : 'text-gray-400'}`}
                        >
                            About
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Expanded Search Pill */}
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:bg-white/10 focus-within:border-white/20 transition-all duration-300 w-48 focus-within:w-64">
                                <span className="text-gray-400 mr-2">🔍</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search movies..."
                                    className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-gray-500 w-full"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
