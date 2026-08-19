# Multimedia App

A full-stack multimedia file management application for uploading, managing, searching, and previewing files such as images, videos, audio, and documents.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Upload and manage files
- File listing and search
- File preview
- File metadata management
- Dashboard
- Health check endpoint
- Swagger API documentation
- Responsive React UI

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Swagger

Authentication

Handles user registration, login, authentication, authorization, and protected routes.

Dashboard

Provides a centralized interface for managing uploaded multimedia files.

File Management

Supports managing different types of files, including:

- Images
- Videos
- Audio
- Documents

Search

Allows users to search and find files from their collection.

File Preview

Allows supported files to be previewed directly within the application.

API

Authentication
POST /api/auth/register
POST /api/auth/login

Files
GET /api/files

API Documentation
/api-docs

The goal of the Multimedia App is to provide a simple, secure, and user-friendly platform for storing and managing multimedia files from a single application.
