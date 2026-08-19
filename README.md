# Multimedia Upload & Search

A full stack multimedia management application built as a technical assessment. The application allows authenticated users to upload, manage, search, preview, and rank multimedia files including images, videos, audio files, and PDFs.

## 🚀 Live Demo

**Frontend:**  
https://multimedia-app-eight.vercel.app/

**Backend:**  
https://multimedia-backend-lmqw.onrender.com/

**Swagger API Documentation:**  
https://multimedia-backend-lmqw.onrender.com/api-docs/

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected application routes
- Multimedia file uploads
- Support for:
  - Images
  - Videos
  - Audio
  - PDF documents
- File preview
- File metadata management
- Search uploaded files by keywords
- Search based on file information/tags
- Search result ranking
- View count and upload-date based ranking
- Cloudinary-based media storage
- MongoDB-based metadata storage
- API error handling
- Swagger/OpenAPI documentation
- Responsive React UI

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Hooks
- Redux
- Axios
- CSS3

### Backend

- Node.js
- Express.js
- Express Middleware
- JWT Authentication
- Swagger / OpenAPI

### Database & Storage

- MongoDB Atlas
- Cloudinary

### Development Tools

- Git
- GitHub
- Postman
- Swagger UI

---

## 📁 Project Structure

```text
multimedia-app/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── ...
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── package.json
│   └── .env
│
└── README.md


🔐 Authentication

The application uses JWT-based authentication.

Users can:

1. Register an account.
2. Log in using their credentials.
3. Receive an authentication token.
4. Access protected functionality after authentication.

Protected operations require a valid JWT token.

⸻

📤 Multimedia Upload

Authenticated users can upload multimedia files.

Supported file types include:

* Images
* Videos
* Audio
* PDF documents

Uploaded files are stored using Cloudinary, while their metadata is stored in MongoDB Atlas.

Stored metadata includes information such as:

* File name
* File type
* File size
* Cloudinary URL
* Upload information
* Tags / searchable information
* View count

⸻

🔎 Search

Users can search uploaded files using keywords.

Search can use information such as:

* File name
* Tags
* Other available file metadata
GET /search?query=video



📊 Ranking

Search results are ranked based on available relevance information such as:

* Keyword matching
* View count
* Upload date
* Tags

This provides more relevant results to the user.

⸻

📚 API Documentation

Complete API documentation is available through Swagger UI:

https://multimedia-backend-lmqw.onrender.com/api-docs/

The Swagger documentation provides the available API endpoints, request parameters, responses, and authentication requirements.
```

Example API operations:
POST /upload
GET /search?query=video
GET /files/:id

🌐 Deployment

The application is deployed using:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Media Storage: Cloudinary

Production URLs

Frontend:

https://multimedia-app-eight.vercel.app/

Backend:

https://multimedia-backend-lmqw.onrender.com/

Swagger:

https://multimedia-backend-lmqw.onrender.com/api-docs/

⸻

🧪 Testing

The application can be tested through:

- Browser-based UI
- Swagger UI
- Postman

The main functionality to verify includes:

1. User registration
2. User login
3. Authentication
4. File upload
5. File preview
6. File search
7. Search ranking
8. Protected API access
9. Error handling

⸻

🛡️ Error Handling

The backend provides error handling for scenarios including:

- Invalid authentication credentials
- Authentication failures
- Invalid file uploads
- API errors
- Invalid requests

The frontend displays appropriate feedback to users when an operation fails.

👨‍💻 Author

Rohith Kuruganti
