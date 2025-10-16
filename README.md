# Diary Full-Stack Project

A simple full-stack diary application using:
- Frontend: React (Vite)
- Backend: Express.js
- Containerization: Docker & docker-compose

Features:
- Add, view, and delete diary entries
- Clean, aesthetic UI with edit-friendly components
- Simple JSON file persistence for ease of grading

Quick start (local, without Docker):
1. Backend:
   - cd server
   - npm install
   - npm start
   Backend runs on http://localhost:5000

2. Frontend:
   - cd frontend
   - npm install
   - npm run dev
   Frontend runs on http://localhost:5173 (Vite default)

Using Docker (recommended for consistent env):
- From project root:
  docker-compose up --build
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Notes:
- Data is stored in server/data/entries.json (simple JSON file).
- This project is packaged so you can extract the zip and open in VS Code.
- Instructions to run, and explanation of files are in the `REPORT.md` included.

Enjoy!