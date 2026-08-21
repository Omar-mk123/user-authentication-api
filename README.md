# 🔐 User Authentication API

A production-oriented RESTful authentication and user management API built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project implements a complete authentication and authorization workflow using **JWT**, **bcryptjs**, **role-based access control**, **input validation**, **centralized error handling**, **rate limiting**, **security headers**, **pagination**, and **search**.

This project is part of my backend development roadmap and was built to practice scalable REST API architecture and real-world backend development patterns.

---

## 📌 Project Overview

The API provides a secure foundation for applications that require:

- User registration and login
- Secure password storage
- JWT-based authentication
- Protected API endpoints
- User and Admin roles
- Profile management
- Password changes
- Administrative user management
- Pagination and user search
- Request validation
- Centralized error handling
- Basic API security protections

---

## ✨ Key Features

### Authentication & Authorization

- User registration
- User login
- Password hashing using bcrypt
- JWT token generation and verification
- Bearer Token authentication
- Protected routes
- Role-based authorization
- User and Admin roles

### User Management

- Get authenticated user profile
- Update profile
- Change password
- Delete own account

### Admin Management

- Get all users
- Get user by ID
- Update user
- Delete user
- Search users
- Pagination
- Role management

### Security

- Password hashing
- JWT authentication
- Helmet security headers
- Rate limiting
- Request body size limits
- Input validation
- Duplicate email protection
- Centralized error handling
- Password exclusion from API responses

---

## 🧰 Tech Stack

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| Node.js            | JavaScript runtime            |
| Express.js         | REST API framework            |
| MongoDB            | NoSQL database                |
| Mongoose           | MongoDB ODM                   |
| JSON Web Token     | Authentication                |
| bcryptjs           | Password hashing              |
| express-validator  | Request validation            |
| helmet             | HTTP security headers         |
| express-rate-limit | Rate limiting                 |
| cors               | Cross-Origin Resource Sharing |
| dotenv             | Environment variables         |
| Nodemon            | Development server            |
| Postman            | API testing                   |

---

## 🏗️ Architecture

The project follows a layered architecture designed to separate responsibilities:

```text
Client / Postman
       │
       ▼
     Routes
       │
       ▼
   Middleware
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
    MongoDB
```

### Responsibility of each layer

**Routes**
Define API endpoints and attach middleware.

**Middleware**
Handle authentication, authorization, validation, and errors.

**Controllers**
Receive HTTP requests and return HTTP responses.

**Services**
Contain business logic.

**Models**
Define MongoDB data structures using Mongoose.

**Utils**
Contain reusable functionality such as JWT, password handling, and API responses.

---

## 📁 Project Structure

```text
12-user-authentication-api/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   └── auth.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── admin.routes.js
│   │   └── auth.routes.js
│   │
│   ├── services/
│   │   └── auth.service.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   └── response.js
│   │
│   ├── validators/
│   │   └── auth.validator.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/12-user-authentication-api.git
cd 12-user-authentication-api
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment variables

Create a `.env` file in the project root:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_strong_secret_key
JWT_EXPIRES_IN=7d
```

### Environment Variables

| Variable         | Description               |
| ---------------- | ------------------------- |
| `PORT`           | Application port          |
| `MONGO_URI`      | MongoDB connection string |
| `JWT_SECRET`     | Secret used to sign JWTs  |
| `JWT_EXPIRES_IN` | JWT expiration duration   |

> ⚠️ Never commit `.env` to GitHub.

---

## 4. Start the development server

```bash
npm run dev
```

Expected output:

```text
MongoDB connected successfully
Server running on port 5000
```

---

## 5. Start the production server

```bash
npm start
```

---

# 🔗 API Documentation

Base URL:

```text
http://localhost:5000
```

## Authentication Endpoints

| Method   | Endpoint                    | Description        | Access        |
| -------- | --------------------------- | ------------------ | ------------- |
| `POST`   | `/api/auth/register`        | Register a user    | Public        |
| `POST`   | `/api/auth/login`           | Login              | Public        |
| `GET`    | `/api/auth/me`              | Get current user   | Authenticated |
| `PATCH`  | `/api/auth/me`              | Update profile     | Authenticated |
| `PATCH`  | `/api/auth/change-password` | Change password    | Authenticated |
| `DELETE` | `/api/auth/me`              | Delete own account | Authenticated |

## Admin Endpoints

| Method   | Endpoint               | Description    | Access |
| -------- | ---------------------- | -------------- | ------ |
| `GET`    | `/api/admin/users`     | Get all users  | Admin  |
| `GET`    | `/api/admin/users/:id` | Get user by ID | Admin  |
| `PATCH`  | `/api/admin/users/:id` | Update user    | Admin  |
| `DELETE` | `/api/admin/users/:id` | Delete user    | Admin  |

---

# 👤 Authentication

## Register

### Request

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "12345678"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "JWT_TOKEN"
  }
}
```

New users are assigned:

```text
role: user
```

by default.

---

# 🔑 Login

### Request

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "JWT_TOKEN"
  }
}
```

---

# 🪪 JWT Authentication

Protected endpoints require a valid Bearer Token.

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Postman

```text
Authorization
    ↓
Type: Bearer Token
    ↓
Token: YOUR_JWT_TOKEN
```

The JWT is:

1. Generated after successful authentication
2. Sent with protected requests
3. Verified by authentication middleware
4. Used to identify the authenticated user

---

# 👤 User Profile

## Get Current User

```http
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

## Update Profile

```http
PATCH /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

## Change Password

```http
PATCH /api/auth/change-password
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "currentPassword": "12345678",
  "newPassword": "87654321"
}
```

## Delete Own Account

```http
DELETE /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 👑 Role-Based Authorization

The system supports two roles:

```text
user
admin
```

### Authentication vs Authorization

```text
Authentication
      ↓
Who are you?

Authorization
      ↓
What are you allowed to do?
```

A valid JWT is not enough to access Admin endpoints. The authenticated user must also have:

```text
role: admin
```

---

# 🧑‍💼 Admin API

## Get All Users

```http
GET /api/admin/users
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Pagination

```http
GET /api/admin/users?page=1&limit=10
```

### Search

```http
GET /api/admin/users?search=Ahmed
```

### Search + Pagination

```http
GET /api/admin/users?search=Ahmed&page=1&limit=10
```

Example response:

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalUsers": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "data": []
}
```

---

## Get User By ID

```http
GET /api/admin/users/:id
Authorization: Bearer ADMIN_JWT_TOKEN
```

Example:

```http
GET /api/admin/users/6a804b5707dec65e764f2c5d
```

---

## Update User

```http
PATCH /api/admin/users/:id
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "name": "Ahmed Mohamed",
  "email": "ahmed@example.com",
  "role": "admin"
}
```

Valid roles:

```text
user
admin
```

---

## Delete User

```http
DELETE /api/admin/users/:id
Authorization: Bearer ADMIN_JWT_TOKEN
```

---

# ✅ Validation

The API validates incoming requests before processing them.

Validation includes:

- Required fields
- Email format
- Minimum password length
- Valid roles
- Current password verification
- MongoDB ObjectId format
- Duplicate email protection

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Password must be at least 6 characters"]
}
```

---

# 🛡️ Security

Security measures implemented in this project include:

### Password Security

Passwords are hashed using bcrypt before being stored.

```text
Plain Password
      ↓
bcrypt
      ↓
Hashed Password
      ↓
MongoDB
```

### JWT Security

JWTs are signed using a private secret stored in environment variables.

### Helmet

Adds security-related HTTP headers.

### Rate Limiting

Restricts repeated requests to reduce abuse and excessive traffic.

### Request Size Limits

Limits JSON request body size.

### Protected Routes

Sensitive endpoints require authentication.

### Role-Based Access Control

Admin endpoints require the `admin` role.

### Sensitive Data Protection

Passwords are excluded from user responses.

---

# ❗ Error Handling

The API uses centralized error handling for consistent responses.

### Invalid ID

```json
{
  "success": false,
  "message": "Invalid ID format"
}
```

### Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Invalid Token

```json
{
  "success": false,
  "message": "Invalid token"
}
```

### Forbidden

```json
{
  "success": false,
  "message": "Access denied"
}
```

### Duplicate Email

```json
{
  "success": false,
  "message": "email already exists"
}
```

---

# 🧪 Testing

The API was designed to be tested with Postman.

### Recommended test flow

```text
1. Register User
       ↓
2. Login
       ↓
3. Copy JWT
       ↓
4. Test /me
       ↓
5. Update Profile
       ↓
6. Change Password
       ↓
7. Create another User
       ↓
8. Promote one User to Admin
       ↓
9. Login as Admin
       ↓
10. Get All Users
       ↓
11. Get User By ID
       ↓
12. Update User
       ↓
13. Delete User
       ↓
14. Test Pagination
       ↓
15. Test Search
       ↓
16. Test Invalid JWT
       ↓
17. Test Unauthorized User
       ↓
18. Test Validation Errors
```

---

# 📊 Example Authentication Flow

```text
                   REGISTER
                       │
                       ▼
                Validate Input
                       │
                       ▼
                Hash Password
                       │
                       ▼
                 Save User
                       │
                       ▼
                 Generate JWT
                       │
                       ▼
                  Return Token
```

### Login Flow

```text
                    LOGIN
                      │
                      ▼
                 Find User
                      │
                      ▼
             Compare Password
                      │
                      ▼
                Generate JWT
                      │
                      ▼
                 Return Token
```

### Protected Request

```text
Client
  │
  ▼
Bearer Token
  │
  ▼
Authentication Middleware
  │
  ▼
Verify JWT
  │
  ▼
Find User
  │
  ▼
Check Role
  │
  ├── user  → User permissions
  │
  └── admin → Admin permissions
```

---

# 📜 NPM Scripts

```bash
npm run dev
```

Starts the development server with Nodemon.

```bash
npm start
```

Starts the server using Node.js.

---

# 🔒 Environment & Git

The following files should never be committed:

```text
.env
node_modules/
```

Recommended `.gitignore`:

```gitignore
node_modules/
.env
```

---

# 🎯 Learning Objectives

This project was built to strengthen practical knowledge of:

- Node.js backend development
- Express.js
- REST API design
- MongoDB
- Mongoose
- MVC architecture
- Service-layer architecture
- Authentication
- Authorization
- JWT
- Password hashing
- Middleware
- Input validation
- Error handling
- API security
- Pagination
- Search
- Postman testing
- Environment variables
- Git/GitHub workflow

```

---

# 🚀 Future Improvements

Possible future enhancements:

- Refresh Tokens
- Email Verification
- Forgot Password / Reset Password
- Account Lockout
- Audit Logs
- Two-Factor Authentication
- Automated Tests with Jest and Supertest
- Swagger / OpenAPI documentation
- Docker support
- CI/CD pipeline
- Production deployment

---

## ⭐ Project Goal

The main goal of this project is to build a secure, modular, and maintainable authentication API while practicing real-world backend architecture and REST API development.

**Project 12 — User Authentication API** 🔐🚀
