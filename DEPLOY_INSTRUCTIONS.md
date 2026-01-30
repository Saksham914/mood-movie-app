# 🚀 Deployment Guide: How to host MoodFlix for FREE

To share your website with friends, you need to host it on the cloud. We will use **Render** for the backend (API) and **Vercel** for the frontend (Website). Both are free.

---

## ✅ Prerequisites
1.  **GitHub Account**: You need one to store your code. [Sign up here](https://github.com/).
2.  **Git Installed**: You likely have this. If not, [download it](https://git-scm.com/downloads).

---

## Step 1: Push your code to GitHub

1.  **Initialize Git** (Run these commands in your main `Mov` folder terminal):
    ```bash
    git init
    git add .
    git commit -m "Initial commit of MoodFlix"
    ```

2.  **Create a New Repository** on GitHub:
    *   Go to [GitHub.com/new](https://github.com/new).
    *   Name it `mood-movie-app`.
    *   Keep it **Public** (easier) or **Private**.
    *   Click **Create repository**.

3.  **Link and Push**:
    *   Copy the commands GitHub gives you under "…or push an existing repository from the command line".
    *   It will look like:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/mood-movie-app.git
        git branch -M main
        git push -u origin main
        ```
    *   Run those commands in your terminal.

---

## Step 2: Deploy Backend (Render)

1.  Go to [dashboard.render.com](https://dashboard.render.com/) and sign up with GitHub.
2.  Click **"New +"** → **"Web Service"**.
3.  Select simple **"Build and deploy from a Git repository"**.
4.  Connect your `mood-movie-app` repository.
5.  **Configure the Service**:
    *   **Name**: `moodflix-api` (or a unique name)
    *   **Region**: Closest to you (e.g., Singapore, Oregon).
    *   **Branch**: `main`
    *   **Root Directory**: `backend` (⚠️ IMPORTANT)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   **Instance Type**: `Free`
6.  **Environment Variables** (Scroll down to "Advanced"):
    *   Click **"Add Environment Variable"**.
    *   **Key**: `TMDB_API_KEY`
    *   **Value**: (Copy the long key from your `backend/.env` file)
    *   Click **"Add Environment Variable"** again.
    *   **Key**: `PORT`
    *   **Value**: `5000`
7.  Click **"Create Web Service"**.
8.  Wait for it to deploy. Once done, copy the URL (e.g., `https://moodflix-api.onrender.com`). **Save this URL.**

---

## Step 3: Deploy Frontend (Vercel)

1.  Go to [vercel.com](https://vercel.com/) and sign up with GitHub.
2.  Click **"Add New..."** → **"Project"**.
3.  Import your `mood-movie-app` repository.
4.  **Configure the Project**:
    *   **Framework Preset**: It should auto-detect `Vite`.
    *   **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   **Key**: `VITE_API_BASE_URL`
    *   **Value**: The Render URL you copied earlier + `/api` (e.g., `https://moodflix-api.onrender.com/api`)
        *   *Note: Ensure you include `/api` at the end if your backend routes are setup that way.*
6.  Click **"Deploy"**.

---

## 🎉 Done!
Vercel will give you a link (e.g., `https://mood-movie-app.vercel.app`).
**Send this link to your friends!** It will work forever and is accessible from anywhere.
