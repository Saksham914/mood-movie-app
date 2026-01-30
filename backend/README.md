# Backend README

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
copy .env.example .env
```

3. Edit `.env` and add your TMDB API key:
```
TMDB_API_KEY=your_actual_tmdb_api_key_here
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/movies/mood/:mood` - Get movies by mood (happy, sad, romantic, angry, chill, motivational)
- `GET /api/movies/search/:query` - Search movies by name
- `GET /api/movies/trending` - Get trending movies this week
- `GET /api/movies/details/:id` - Get detailed information about a specific movie

## Environment Variables

- `TMDB_API_KEY` - Your TMDB API key (required)
- `PORT` - Server port (default: 5000)

## Getting TMDB API Key

1. Visit https://www.themoviedb.org/
2. Create a free account
3. Go to Settings → API
4. Request an API key (Developer option)
5. Copy the API key to your .env file
