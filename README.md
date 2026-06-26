# Social Network Backend API

# Social Network Backend API

![Node.js](https://img.shields.io/badge/Node.js-v22.x-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/Security-bcrypt-orange)
![License](https://img.shields.io/badge/License-MIT-blue)


A RESTful backend API built with **Node.js**, **Express.js**, and **SQLite** that implements a simple social networking system with secure JWT authentication and user follow/unfollow functionality.

This project follows a **layered architecture** (Routes → Controllers → Services → Models → Database) to ensure clean code organization, scalability, and maintainability.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Follow Another User
- Unfollow a User
- Get Followers of a User
- SQLite Database
- Layered Architecture
- Centralized Error Handling
- Request Validation
- Secure Password Storage
- Environment Variable Configuration

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- SQLite
- better-sqlite3

### Authentication

- JSON Web Token (JWT)
- bcrypt

### Validation

- express-validator

### Development Tools

- Nodemon
- dotenv

---

# Project Structure

```
backend-task
│
├── database
│   └── backend.sqlite
│
├── src
│   ├── config
│   │   └── database.js
│   │
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   │
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models
│   │   └── user.model.js
│   │
│   ├── routes
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   │
│   ├── services
│   │   ├── auth.service.js
│   │   └── user.service.js
│   │
│   ├── utils
│   │   ├── AppError.js
│   │   ├── asyncHandler.js
│   │   └── jwt.js
│   │
│   ├── validators
│   │   ├── auth.validator.js
│   │   └── user.validator.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── package.json
└── README.md
```

---

# Architecture

The project follows a layered architecture to separate concerns.

```
Client
   │
   ▼
Routes
   │
   ▼
Validation Middleware
   │
   ▼
Authentication Middleware
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models
   │
   ▼
SQLite Database
```

Each layer has a single responsibility.

| Layer | Responsibility |
|--------|----------------|
| Routes | API endpoint mapping |
| Controllers | Handle HTTP request and response |
| Services | Business logic |
| Models | Database interaction |
| Database | Data persistence |

---

# Database Schema

## Users

| Column | Type |
|----------|---------|
| id | INTEGER |
| name | TEXT |
| email | TEXT UNIQUE |
| password | TEXT |
| created_at | DATETIME |

---

## Followers

| Column | Type |
|----------|---------|
| id | INTEGER |
| follower_id | INTEGER |
| following_id | INTEGER |
| created_at | DATETIME |

Relationships

- follower_id → users.id
- following_id → users.id

Constraints

- Foreign Keys
- Unique(follower_id, following_id)

---

# API Endpoints

## Register User

### POST

```
/api/auth/register
```

### Request Body

```json
{
    "name": "Sujal",
    "email": "sujal@gmail.com",
    "password": "Password123"
}
```

### Success Response

```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "Sujal",
            "email": "sujal@gmail.com"
        },
        "token": "<jwt-token>"
    }
}
```

---

## Login User

### POST

```
/api/auth/login
```

### Request

```json
{
    "email": "sujal@gmail.com",
    "password": "Password123"
}
```

### Success Response

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "Sujal",
            "email": "sujal@gmail.com"
        },
        "token": "<jwt-token>"
    }
}
```

---

## Follow User

### POST

```
/api/users/:id/follow
```

Authentication Required

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

```json
{
    "success": true,
    "message": "User followed successfully."
}
```

---

## Unfollow User

### DELETE

```
/api/users/:id/follow
```

Authentication Required

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

```json
{
    "success": true,
    "message": "User unfollowed successfully."
}
```

---

## Get Followers

### GET

```
/api/users/:id/followers
```

### Success Response

```json
{
    "success": true,
    "data": {
        "count": 2,
        "followers": [
            {
                "id": 1,
                "name": "John",
                "email": "john@example.com"
            },
            {
                "id": 2,
                "name": "Alice",
                "email": "alice@example.com"
            }
        ]
    }
}
```

---

# Authentication

The application uses **JWT (JSON Web Tokens)** for authentication.

Protected routes require the following HTTP header:

```
Authorization: Bearer <JWT_TOKEN>
```

Passwords are never stored in plain text.

They are securely hashed using **bcrypt** before being stored in the database.

---

# Error Handling

The application implements centralized error handling using custom middleware.

Example Error Response

```json
{
    "success": false,
    "message": "User not found."
}
```

---

# Validation

Incoming requests are validated before reaching the business logic.

Examples include:

- Required fields
- Valid email format
- Password length
- Numeric route parameters

---

# Environment Variables

Create a `.env` file.

```
PORT=5000

JWT_SECRET=your_super_secret_key

JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10
```

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd backend-task
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```bash
cp .env.example .env
```

Start the development server.

```bash
npm run dev
```

---

# Testing

The API can be tested using:

- Postman
- Bruno
- Thunder Client

Recommended testing order:

1. Register two users
2. Login
3. Follow another user
4. Fetch followers
5. Unfollow user

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Centralized Error Handling
- Request Validation
- SQL Injection Prevention using Prepared Statements
- Foreign Key Constraints
- Unique Constraints
- Environment Variable Configuration

---

