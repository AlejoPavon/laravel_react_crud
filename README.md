# Laravel + React CRUD Stack

![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)

A modern Fullstack application built with a decoupled architecture. This project uses **Laravel** as a robust REST API engine and **React** for a dynamic, high-performance user interface.

---

## Architecture

The project follows a **Separation of Concerns (SoC)** approach:

- **Backend:** Laravel-powered RESTful API.
- **Frontend:** Single Page Application (SPA) built with React and Vite.
- **Communication:** JSON data exchange via Axios.
- **Database:** PostgreSQL (Recommended) or MySQL.
- **Auth:** Planned implementation with Laravel Sanctum (Token-based).

---

## Project Structure

```text
.
├── backend/           # Laravel Framework (API)
│   ├── app/Models     # Eloquent Models
│   └── routes/api.php # API Endpoints
└── frontend/          # React Application (Vite)
    ├── src/           # Components, Hooks, and Logic
    └── public/        # Static Assets