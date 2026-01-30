function About() {
    return (
        <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                About MoodFlix
            </h1>

            <div className="space-y-12 text-gray-300 leading-relaxed">
                <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
                    <p>
                        MoodFlix was born from a simple idea: picking a movie shouldn't be hard.
                        Instead of endlessly scrolling through genres, tell us how you feel, and we'll find the perfect match.
                        Whether you're feeling adventurous, nostalgic, or just want a good laugh, we've got you covered.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-white">How It Works</h2>
                        <ul className="space-y-3 list-disc list-inside text-gray-400">
                            <li>Select your current mood</li>
                            <li>Get instant, curated recommendations</li>
                            <li>Discover hidden gems and classics</li>
                            <li>Save your favorites for later</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Powered By</h2>
                        <p className="mb-4">
                            We utilize the extensive database of TMDB (The Movie Database) to bring you accurate and up-to-date movie information.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Data provided by TMDB</span>
                        </div>
                    </section>
                </div>

                <section className="text-center pt-8">
                    <h3 className="text-xl font-medium mb-4">Ready to watch something?</h3>
                    <a href="/discover" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-500/20">
                        Find a Movie
                    </a>
                </section>
            </div>
        </div>
    );
}

export default About;
