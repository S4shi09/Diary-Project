# Report (short)
This document explains the project structure and how the diary app works.

## Structure
- /frontend  -> React (Vite)
- /server    -> Express API (stores data in data/entries.json)
- docker-compose.yml -> runs both services
- README.md -> usage instructions

## How it works (high level)
- React app calls API endpoints under `/api/*`.
  - GET /api/entries -> list entries
  - POST /api/entries -> add entry { title, body }
  - DELETE /api/entries/:id -> delete entry
- The server persists entries to a JSON file so data persists across restarts.

## Screenshots
(You can add screenshots here after you run the project and capture images.)

## GitHub
Add your GitHub link here after you upload the project.

