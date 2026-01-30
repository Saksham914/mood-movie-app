# Software Requirements Specification (SRS)
## for MoodFlix - Mood-Based Movie Recommender

**Version**: 1.0  
**Date**: January 27, 2026  
**Status**: Final

---

## 1. Introduction

### 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) document is to provide a detailed description of the "MoodFlix" web application. This document covers the functional and non-functional requirements, system architecture, and design constraints for the project. It is intended for developers, project managers, and testers to understand the system's capabilities and scope.

### 1.2 Scope
MoodFlix is a responsive full-stack web application designed to recommend movies based on the user's current emotional state. The system leverages the TMDB (The Movie Database) API to fetch movie data. Key features include mood-based filtering, trending movie display, search functionality, and detailed movie information. The application aims to solve the problem of "choice paralysis" by narrowing down movie options based on mood.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification
- **TMDB**: The Movie Database (External API provider)
- **API**: Application Programming Interface
- **UI**: User Interface
- **UX**: User Experience
- **SPA**: Single Page Application
- **MVC**: Model-View-Controller architecture pattern
- **JSON**: JavaScript Object Notation

---

## 2. Overall Description

### 2.1 Product Perspective
MoodFlix is a standalone web-based application. It consists of a frontend client built with React and Vite, and a backend server built with Node.js and Express. The system acts as a middleware between the user and the TMDB API, processing user requests (like "I feel happy") and translating them into specific API queries (like "Genre: Comedy, Adventure").

### 2.2 Product Functions
The major functions of the MoodFlix application include:
- **Mood Selection**: Users can select from 6 distinct moods (Happy, Sad, Romantic, Angry, Chill, Motivational).
- **Movie Recommendation**: Displaying a curated list of movies corresponding to the selected mood.
- **Trending Movies**: Showcasing currently popular movies.
- **Search**: Allowing users to search for specific movies by title.
- **Movie Details**: Providing in-depth information about a selected movie (plot, rating, release date, poster).
- **Persistent State**: Remembering the user's last selected mood using LocalStorage.

### 2.3 User Characteristics
- **General Users**: Movie enthusiasts looking for recommendations. No technical skills required.
- **Developers**: Individuals looking to extend or maintain the codebase. Familiar with JavaScript/React/Node.js.

### 2.4 Operating Environment
- **Client Side**: Modern web browsers (Chrome, Firefox, Safari, Edge) on Desktop, Tablet, and Mobile devices.
- **Server Side**: Node.js runtime environment.
- **Network**: Requires an active internet connection to fetch data from TMDB.

### 2.5 Assumptions and Dependencies
- **TMDB API Availability**: The system relies entirely on the TMDB API for data. It is assumed the API is available and the rate limits are respected.
- **Internet Connection**: Development and usage require an internet connection.
- **Node.js**: The host machine must have Node.js (v16+) installed.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
- **Home Page**: clean, glassmorphism-styled landing page with a mood selector grid and trending text.
- **Mood Results Page**: Grid view of movie cards filtered by the selected mood.
- **Movie Details Page**: Detailed view with backdrop image, poster, synopsis, ratings, and meta-data.
- **Search Results Page**: List of movies matching the user's query.
- **Navigation Bar**: Persistent top bar with logo, search input, and dark mode toggle (if implemented).
- **Styling**: The application uses a consistent color palette (Purple/Pink gradients) and dark mode theme.

### 3.2 Hardware Interfaces
- The application is software-based and runs on standard consumer hardware (PC, Mobile) capable of running a modern web browser.

### 3.3 Software Interfaces
- **TMDB API v3**: Used for fetching movie metadata, images, and genre associations.
- **Vite Proxy**: Used in development to forward `/api` requests to the backend server.
- **Operating System**: Cross-platform compatibility (Windows, macOS, Linux).

### 3.4 Communications Interfaces
- **HTTP/HTTPS**: Client-Server communication via REST API.
- **JSON**: Data exchange format for all API responses.

---

## 4. System Features

### 4.1 Mood-Based Recommendations
- **Description**: Users select a mood, and the system queries the backend to find movies with matching genres.
- **Functional Requirements**:
  - System must display 6 mood options: Happy, Sad, Romantic, Angry, Chill, Motivational.
  - Clicking a mood must trigger a GET request to `/api/movies/mood/:mood`.
  - Backend must map text mood to TMDB genre IDs (e.g., Happy -> Comedy, Adventure).
  - Frontend must render the returned list of movies.

### 4.2 Movie Search
- **Description**: Users can search for movies by text.
- **Functional Requirements**:
  - Search bar must accept alphanumeric input.
  - Submitting a search must trigger a GET request to `/api/movies/search/:query`.
  - System must handle empty results gracefully.

### 4.3 Trending Movies
- **Description**: Display a list of popular movies on the home page.
- **Functional Requirements**:
  - On application load, trigger `GET /api/movies/trending`.
  - Display the top trending movies for the week.

### 4.4 View Movie Details
- **Description**: Viewing detailed info for a specific movie.
- **Functional Requirements**:
  - Clicking a movie card navigates to `/movie/:id`.
  - Trigger `GET /api/movies/details/:id`.
  - Display title, overview, release date, vote average, and poster/backdrop.

---

## 5. Non-functional Requirements

### 5.1 Performance Requirements
- **Response Time**: API responses should largely depend on TMDB latency but generally be under 2 seconds.
- **Rendering**: First Contentful Paint (FCP) should be under 1.5 seconds on broadband connections.
- **Optimization**: Lazy loading should be used for images to save bandwidth.

### 5.2 Reliability
- **Error Handling**: The system should display user-friendly error messages (e.g., "Could not fetch movies") rather than crashing or showing stack traces.
- **Fallback**: Fallback images should be provided if movie posters are missing.

### 5.3 Security Requirements
- **API Keys**: TMDB API keys must be stored in environment variables (`.env`) on the backend and never exposed to the client.
- **CORS**: Backend should strictly define allowed origins (e.g., `http://localhost:3000`).

### 5.4 Maintainability
- **Code Structure**: The codebase follows strict separation of concerns (Frontend vs. Backend, Controllers vs. Routes).
- **Documentation**: Code is documented, and project includes `README.md`, `ARCHITECTURE.md`, etc.

---

## 6. Appendix

### 6.1 Mood-Genre Mapping Table
| Mood | Linked Genres | TMDB Genre IDs |
|------|---------------|----------------|
| Happy | Comedy, Adventure | 35, 12 |
| Sad | Drama | 18 |
| Romantic | Romance | 10749 |
| Angry | Action, Thriller | 28, 53 |
| Chill | Family, TV Movie | 10751, 10770 |
| Motivational | Documentary, History | 99, 36 |

### 6.2 Tech Stack Versions
- **Node.js**: v16+
- **React**: v18.2.0
- **Express**: v4.18.2
- **Vite**: v5.0.8
- **Tailwind CSS**: v3.3.6
