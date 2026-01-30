import { useNavigate } from 'react-router-dom';

const moods = [
    { name: 'Happy', emoji: '😊', desc: 'Cheer up' },
    { name: 'Sad', emoji: '😢', desc: 'Let it out' },
    { name: 'Romantic', emoji: '💕', desc: 'Feel the love' },
    { name: 'Angry', emoji: '😠', desc: 'Release steam' },
    { name: 'Chill', emoji: '😌', desc: 'Relax mode' },
    { name: 'Motivational', emoji: '💪', desc: 'Get inspired' },
];

function MoodSelector() {
    const navigate = useNavigate();

    return (
        <div className="py-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {moods.map((mood, idx) => (
                    <button
                        key={mood.name}
                        onClick={() => navigate(`/mood/${mood.name.toLowerCase()}`)}
                        className={`mood-card group animate-fade-in`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <div className="mb-4 text-4xl transform transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">
                            {mood.emoji}
                        </div>
                        <h3 className="text-lg font-semibold tracking-wide text-gray-200 group-hover:text-white transition-colors">
                            {mood.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            {mood.desc}
                        </p>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MoodSelector;
