````markdown
# 🚀 Project Setup Guide

## 📦 Installation & Configuration

### 1. Install Dependencies

```bash
npm install
```
````

### 2. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
JWT_SECRET=your_jwt_secret_key_here  # For signing JWT access tokens
PORT=8000                           # Server port (e.g., 8000)
FRONTEND_URL=http://localhost:3000   # Frontend URL for CORS
```

### 3. Database Configuration

Update or add if not already added `config/config.json` with your Postgres credentials:

```json
{
  "development": {
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "your_db_name",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

## 🛠 Database Operations

### 🔄 Migrations

| Command                    | Purpose                              |
| -------------------------- | ------------------------------------ |
| `npm run migrate:undo-all` | Rollback all migrations _(optional)_ |
| `npm run migrate`          | Apply all pending migrations         |

### 🌱 Seeding

| Command                 | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `npm run seed:undo-all` | Clear all seed data _(optional)_                            |
| `npm run seed`          | Populate initial data (categories, products, users, seller) |

## ▶️ Start the Server

### Development Mode (Hot Reload with nodemon)

```bash
npm run dev
```

### Without nodemon

```bash
npm run start
```

---

## 🌟 Key Features

- 🔒 JWT Authentication
- 🌐 CORS Pre-configured
- 🛒 Pre-loaded Demo Data
- 📦 Sequelize ORM
- 🐘 PostgreSQL Ready

---

> **Note**: The `.env` and `config.json` files are sensitive - never commit them to version control!
