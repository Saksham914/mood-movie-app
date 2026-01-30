import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center pt-24 pb-12">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/20 blur-[120px] animate-pulse"></div>
            </div>

            <div className="container mx-auto px-6 text-center z-10">
                {/* Main Content */}
                <div className="animate-fade-in space-y-8">
                    <div className="inline-block px-4 py-2 rounded-full glass-effect mb-4 border border-white/10 animate-scale-in">
                        <span className="text-sm font-medium tracking-wider text-purple-300 uppercase">
                            ✨ AI-Powered Movie Discovery
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-6">
                        Match Your <br />
                        <span className="gradient-text">Mood & Vibe</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        Stop scrolling endlessly. Tell us how you feel, and we'll curate the perfect cinematic experience for you instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up">
                        <Link
                            to="/discover"
                            className="btn-primary flex items-center gap-3 text-lg group"
                        >
                            Start Exploring
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>

                        <a
                            href="#features"
                            className="px-8 py-3 rounded-full glass-effect hover:bg-white/10 transition-all font-medium text-lg border border-white/10"
                        >
                            How it Works
                        </a>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="glass-effect p-8 rounded-3xl hover-lift">
                        <div className="text-4xl mb-4">🎭</div>
                        <h3 className="text-xl font-bold mb-2">Mood Analysis</h3>
                        <p className="text-gray-400">Advanced mapping of emotional states to cinematic genres for precise recommendations.</p>
                    </div>
                    <div className="glass-effect p-8 rounded-3xl hover-lift">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-xl font-bold mb-2">Instant Results</h3>
                        <p className="text-gray-400">Get curated lists in milliseconds. No sign-up required. Just feel and watch.</p>
                    </div>
                    <div className="glass-effect p-8 rounded-3xl hover-lift">
                        <div className="text-4xl mb-4">💎</div>
                        <h3 className="text-xl font-bold mb-2">Premium UI</h3>
                        <p className="text-gray-400">Experience a beautifully crafted, distraction-free interface designed for movie lovers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
