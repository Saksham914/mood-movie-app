# 🔧 MoodFlix - Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### ❌ "npm: command not found" or "node: command not found"

**Problem**: Node.js is not installed or not in PATH

**Solution**:
1. Download and install Node.js from https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. Restart your terminal after installation
4. Verify installation: `node --version` and `npm --version`

---

#### ❌ "Cannot find module" errors

**Problem**: Dependencies not installed properly

**Solution**:
```powershell
# Delete node_modules and package-lock.json
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

cd ../frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

#### ❌ PowerShell script execution error

**Problem**: Script execution is disabled

**Error Message**:
```
File cannot be loaded because running scripts is disabled on this system
```

**Solution**:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### Backend Issues

#### ❌ "TMDB API error" or "401 Unauthorized"

**Problem**: Invalid or missing TMDB API key

**Solution**:
1. Check if `backend/.env` file exists
2. Open `backend/.env` in a text editor
3. Ensure it contains: `TMDB_API_KEY=your_actual_key_here`
4. Get a free API key from https://www.themoviedb.org/settings/api
5. Replace `your_actual_key_here` with your real API key
6. Restart the backend server

**Example .env file**:
```
TMDB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
PORT=5000
```

---

#### ❌ "Port 5000 already in use"

**Problem**: Another application is using port 5000

**Solution 1** - Change the port:
```
# Edit backend/.env
PORT=5001
```

**Solution 2** - Kill the process using port 5000:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

#### ❌ Backend server crashes immediately

**Problem**: Syntax error or missing dependencies

**Solution**:
1. Check the error message in the terminal
2. Ensure all dependencies are installed: `npm install`
3. Check that `backend/.env` file exists
4. Verify Node.js version: `node --version` (should be v16+)

---

### Frontend Issues

#### ❌ "Cannot connect to backend" or "Network Error"

**Problem**: Backend is not running or wrong port

**Solution**:
1. Ensure backend is running on port 5000
2. Check backend terminal for errors
3. Verify proxy in `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```
4. If backend is on different port, update the target

---

#### ❌ "Port 3000 already in use"

**Problem**: Another application is using port 3000

**Solution 1** - Vite will automatically suggest another port (press 'y')

**Solution 2** - Manually specify port:
```javascript
// Edit frontend/vite.config.js
server: {
  port: 3001,
  // ... rest of config
}
```

---

#### ❌ Blank white page or "Cannot GET /"

**Problem**: Frontend build issue or routing problem

**Solution**:
1. Clear browser cache (Ctrl + Shift + Delete)
2. Hard reload (Ctrl + Shift + R)
3. Check browser console for errors (F12)
4. Restart the frontend dev server
5. Delete `frontend/node_modules` and reinstall

---

#### ❌ Images not loading (broken image icons)

**Problem**: TMDB image URLs or API response issue

**Solution**:
1. Check browser console for 404 errors
2. Verify backend is returning correct data
3. Check internet connection
4. TMDB images might be temporarily unavailable

---

### API Issues

#### ❌ "No movies found" for all moods

**Problem**: TMDB API issue or incorrect genre mapping

**Solution**:
1. Check backend console for API errors
2. Verify TMDB API key is valid
3. Test TMDB API directly:
```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY
```
4. Check TMDB API status: https://status.themoviedb.org/

---

#### ❌ Search returns no results

**Problem**: Search query encoding or API issue

**Solution**:
1. Try different search terms
2. Check backend logs for errors
3. Verify search endpoint in browser:
```
http://localhost:5000/api/movies/search/avengers
```

---

### Build Issues

#### ❌ "npm run build" fails

**Problem**: Build errors or missing dependencies

**Solution**:
```powershell
cd frontend

# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Try build again
npm run build
```

---

#### ❌ Production build doesn't work

**Problem**: Environment variables or API URLs

**Solution**:
1. Update API base URL for production
2. Ensure backend is accessible from frontend
3. Check CORS settings in backend
4. Verify all environment variables are set

---

### Browser Issues

#### ❌ Styles not loading correctly

**Problem**: Tailwind CSS not compiled or cache issue

**Solution**:
1. Hard refresh browser (Ctrl + Shift + R)
2. Clear browser cache
3. Restart Vite dev server
4. Check `tailwind.config.js` content paths
5. Verify `index.css` has Tailwind directives

---

#### ❌ Dark mode not working

**Problem**: LocalStorage or class not applied

**Solution**:
1. Open browser DevTools (F12)
2. Check Application → Local Storage
3. Clear local storage and refresh
4. Verify `<html>` element has `class="dark"`

---

### Performance Issues

#### ❌ Slow loading or lag

**Problem**: Too many API calls or large images

**Solution**:
1. Check Network tab in DevTools
2. Reduce number of movies displayed
3. Implement pagination
4. Use smaller image sizes from TMDB
5. Add debouncing to search

---

#### ❌ High memory usage

**Problem**: Memory leak or too many components

**Solution**:
1. Close unused browser tabs
2. Restart dev servers
3. Check for infinite loops in useEffect
4. Ensure proper cleanup in components

---

## Debugging Tips

### Check Backend Health
```powershell
# Test backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"Server is running"}
```

### Check Frontend-Backend Connection
```powershell
# Test API endpoint from frontend
# Open browser console and run:
fetch('/api/movies/trending')
  .then(r => r.json())
  .then(console.log)
```

### View Detailed Logs

**Backend**:
```javascript
// Add to controllers/moviesController.js
console.log('Request params:', req.params);
console.log('API response:', data);
```

**Frontend**:
```javascript
// Add to any component
console.log('State:', { movies, loading, error });
```

### Browser DevTools Checklist
1. **Console** - Check for JavaScript errors
2. **Network** - Verify API calls and responses
3. **Application** - Check LocalStorage
4. **Elements** - Inspect DOM and styles
5. **Performance** - Check for bottlenecks

---

## Getting Help

### Before Asking for Help

1. ✓ Check this troubleshooting guide
2. ✓ Read error messages carefully
3. ✓ Check browser console (F12)
4. ✓ Verify both servers are running
5. ✓ Try restarting servers
6. ✓ Check TMDB API key is valid

### Information to Provide

When reporting an issue, include:
- Operating System and version
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Error message (full text)
- Steps to reproduce
- Screenshots (if relevant)
- Browser and version

### Useful Commands

```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# List running processes on port
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update
```

---

## Still Having Issues?

1. **Check README.md** - Main documentation
2. **Check QUICKSTART.md** - Setup guide
3. **Check PROJECT_SUMMARY.md** - Technical details
4. **Check ARCHITECTURE.md** - System design

---

**Last Updated**: January 2026

**Tip**: Most issues are resolved by ensuring both servers are running and the TMDB API key is correctly set! 🚀
