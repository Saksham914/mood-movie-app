import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
    const navigate = useNavigate();
    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750/1a1a1a/cccccc?text=No+Poster';

    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="movie-card group aspect-[2/3]"
        >
            <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-medium text-purple-400 mb-1 tracking-wider uppercase">{year}</span>
                <h3 className="text-lg font-bold leading-tight mb-2 text-white">{movie.title}</h3>

                <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm font-medium text-gray-200">{rating}</span>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
