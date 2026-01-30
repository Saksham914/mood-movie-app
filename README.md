# 🎬 MoodFlix - Mood-Based Movie Recommender

A modern, responsive web application that recommends movies based on your current mood. Built with React, Vite, Tailwind CSS, Node.js, Express, and TMDB API.

![MoodFlix](https://img.shields.io/badge/MoodFlix-Movie%20Recommender-purple)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## ✨ Features

- 🎭 **Mood-Based Recommendations**: Select from 6 different moods (Happy, Sad, Romantic, Angry, Chill, Motivational)
- 🔥 **Trending Movies**: See what's popular this week
- 🔍 **Search Functionality**: Search for any movie by name
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- 🌙 **Dark Mode**: Beautiful dark theme with glassmorphism effects
- ⚡ **Fast & Modern**: Built with Vite for lightning-fast development
- 🎨 **Stunning UI**: Gradient backgrounds, smooth animations, and hover effects
- 💾 **LocalStorage**: Remembers your last selected mood

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism and animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TMDB API** - Movie database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
mood-movie-recommender/
├── backend/
│   ├── controllers/
│   │   └── moviesController.js    # API logic for movies
│   ├── routes/
│   │   └── movies.js               # API routes
│   ├── .env.example                # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                   # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorMessage.jsx    # Error display component
│   │   │   ├── Loader.jsx          # Loading spinner
│   │   │   ├── MoodSelector.jsx    # Mood selection grid
│   │   │   ├── MovieCard.jsx       # Movie card component
│   │   │   └── Navbar.jsx          # Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── MoodResults.jsx     # Mood-based results
│   │   │   ├── MovieDetails.jsx    # Movie detail page
│   │   │   └── SearchResults.jsx   # Search results page
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # Entry point
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **TMDB API Key** (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

#### 1. Get TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key

#### 2. Clone or Navigate to Project

```bash
cd "C:\Users\SAKSHAM SHUKLA\Downloads\Mov"
```

#### 3. Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env file and add your TMDB API key
# TMDB_API_KEY=your_actual_api_key_here
# PORT=5000
```

**Important**: Open `backend/.env` in a text editor and replace `your_tmdb_api_key_here` with your actual TMDB API key.

#### 4. Setup Frontend

```bash
# Navigate to frontend folder (from project root)
cd ../frontend

# Install dependencies
npm install
```

## 🎮 Running the Application

You need to run both backend and frontend servers simultaneously.

### Option 1: Using Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:3000`

### Option 2: Using PowerShell (Both Servers)

```powershell
# From project root
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

## 🌐 Access the Application

Once both servers are running, open your browser and navigate to:

```
http://localhost:3000
```

## 📖 How to Use

1. **Select Your Mood**: On the home page, click on one of the 6 mood cards
2. **Browse Movies**: View movies curated for your selected mood
3. **View Details**: Click on any movie card to see full details
4. **Search Movies**: Use the search bar in the navbar to find specific movies
5. **Check Trending**: Scroll down on the home page to see trending movies

## 🎨 Mood-to-Genre Mapping

- **Happy** 😊 → Comedy, Adventure
- **Sad** 😢 → Drama
- **Romantic** 💕 → Romance
- **Angry** 😠 → Action, Thriller
- **Chill** 😌 → Family, TV Movie
- **Motivational** 💪 → Documentary, History

## 🔧 API Endpoints

### Backend API Routes

- `GET /api/health` - Health check
- `GET /api/movies/mood/:mood` - Get movies by mood
- `GET /api/movies/search/:query` - Search movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/details/:id` - Get movie details

## 🎯 Features Implemented

✅ Mood-based movie recommendations  
✅ TMDB API integration  
✅ Search functionality  
✅ Movie details page  
✅ Trending movies section  
✅ Responsive design  
✅ Dark mode support  
✅ Loading states  
✅ Error handling  
✅ LocalStorage for last mood  
✅ Smooth animations  
✅ Glassmorphism UI  
✅ SEO-friendly  

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `TMDB API error`  
**Solution**: Check that your API key is correctly set in `backend/.env`

**Problem**: `Port 5000 already in use`  
**Solution**: Change the PORT in `backend/.env` to another port (e.g., 5001)

### Frontend Issues

**Problem**: `Cannot connect to backend`  
**Solution**: Ensure backend is running on port 5000, or update the proxy in `frontend/vite.config.js`

**Problem**: `Module not found`  
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### PowerShell Script Execution Error

If you get a script execution error, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the amazing movie database API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Made with ❤️ and ☕**

Enjoy discovering movies based on your mood! 🎬✨
