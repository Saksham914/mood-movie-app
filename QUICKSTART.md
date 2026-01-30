# 🚀 QUICK START GUIDE

## Prerequisites
- Node.js installed (v16+)
- TMDB API Key (get free from https://www.themoviedb.org/settings/api)

## Step-by-Step Setup (5 minutes)

### 1️⃣ Get Your TMDB API Key
1. Go to https://www.themoviedb.org/
2. Sign up for a free account
3. Navigate to Settings → API
4. Request API Key (choose "Developer")
5. Copy your API key

### 2️⃣ Setup Backend
```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# IMPORTANT: Open backend/.env in notepad and paste your API key
# Replace "your_tmdb_api_key_here" with your actual key
notepad .env
```

### 3️⃣ Setup Frontend
```powershell
# Navigate to frontend folder (from project root)
cd ../frontend

# Install dependencies
npm install
```

### 4️⃣ Run the Application

**Open TWO PowerShell windows:**

**Window 1 (Backend):**
```powershell
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Window 2 (Frontend):**
```powershell
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:3000

### 5️⃣ Open Your Browser
Navigate to: **http://localhost:3000**

## 🎉 You're Done!

Select a mood and start discovering movies!

## ⚠️ Common Issues

**"Cannot find module"**
- Solution: Run `npm install` in both backend and frontend folders

**"TMDB API error"**
- Solution: Check your API key in `backend/.env`

**"Port already in use"**
- Solution: Close other applications using ports 3000 or 5000

**PowerShell script execution error**
- Solution: Run PowerShell as Admin and execute:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

## 📝 Quick Commands Reference

```powershell
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd frontend && npm install

# Run backend
cd backend && npm run dev

# Run frontend
cd frontend && npm run dev

# Build for production
cd frontend && npm run build
```

---

Need help? Check the main README.md for detailed documentation!
