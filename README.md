# Digital Service Orchestrator

A modern, high-performance Service Management application built with **Laravel 11**, **Inertia.js**, **React**, and **Chakra UI**. This project features a cutting-edge fintech/cyber aesthetic and a robust backend designed for scaling digital service workflows.

## 🚀 Key Features

- **Premium UI/UX**: Built with Chakra UI, featuring a sleek dark mode, glassmorphism, and smooth micro-animations.
- **Secure Authentication**: Fully integrated with Laravel Breeze (Sanctum) for robust user security and session management.
- **Service Dashboard**: 
    - Full CRUD (Create, Read, Update, Delete) operations for digital services.
    - **Fast Toggle**: Instantly activate/deactivate services via a switch with confirmation safeguards.
    - **Advanced Filtering**: Debounced search and category/status filtering.
    - **Server-side Pagination**: High-performance data handling with 10 items per page by default.
- **Profile Management**: Direct dashboard access to update account information and security settings (Password).
- **Reusable Architecture**: Custom modular components for modals, confirmation dialogs, and table views.

## 🛠️ Tech Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 18, Inertia.js
- **Styling**: Chakra UI (Modern CSS-in-JS)
- **Icons**: React Icons (Material Design)
- **Database**: MySQL / SQLite
- **HTTP Client**: Axios

## 📦 Installation Guide

Follow these steps to get your development environment up and running:

### 1. Prerequisites
Ensure you have the following installed:
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL or SQLite

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/service-management-mini-App.git
cd service-management-mini-App
```

### 3. Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install JS dependencies
npm install
```

### 4. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```
Edit the `.env` file to configure your database connection (DB_DATABASE, DB_USERNAME, DB_PASSWORD).

### 5. Database Migration
```bash
php artisan migrate
```

### 6. Run the Application
You will need to run two processes simultaneously:

**Start the Laravel Server:**
```bash
php artisan serve
```

**Start the Vite Development Server:**
```bash
npm run dev
```

Visit `http://localhost:8000` to see the application in action.

## 🧪 Development Commands

- `php artisan migrate:fresh`: Reset and re-run all migrations.
- `php artisan db:seed`: Seed the database with sample data.
- `npm run build`: Create a production-ready bundle.

## 📄 License
This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
