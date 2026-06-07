# 🍔 Food Delivery App

A full-stack Food Delivery Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse food items, manage their cart, place orders, and track order history through a responsive and user-friendly interface.

---

## 🚀 Live Demo

**Application URL:**  
https://your-render-url.onrender.com

---

## ✨ Features

- User Registration and Login
- JWT-based Authentication
- Secure Password Hashing using bcrypt
- Browse Food Items
- Add Items to Cart
- Place Orders
- View Order History
- Order Cancellation
- Responsive User Interface
- RESTful API Architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt.js

### DevOps & Deployment
- Docker
- Docker Compose
- Jenkins CI/CD
- Render
- GitHub

---


## ⚙️ Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/Vandya12/food-delivery-app.git
cd food-delivery-app
```

### 2. Backend Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 4. Run Backend

```bash
cd backend
npm start
```

### 5. Run Frontend

```bash
cd frontend
npm start
```

Frontend will run on:

```text
http://localhost:3000
```

Backend will run on:

```text
http://localhost:5000
```

---

## 🐳 Docker Setup

### Build Backend Image

```bash
docker build -t food-backend ./backend
```

### Build Frontend Image

```bash
docker build -t food-frontend ./frontend
```

---

## 🐳 Docker Compose

Run the complete application:

```bash
docker compose up
```

Stop containers:

```bash
docker compose down
```

View running containers:

```bash
docker ps
```

---

## 🔄 Jenkins CI Pipeline

A Jenkins pipeline has been configured for Continuous Integration.

### Pipeline Stages

- Checkout Source Code from GitHub
- Repository Structure Validation
- Git Environment Verification
- Java Environment Verification
- Build Validation

Pipeline configuration is defined in:

```text
Jenkinsfile
```

---

## ☁️ Deployment

The application is deployed on Render.

Deployment Architecture:

```text
GitHub Repository
        │
        ▼
      Render
        │
        ▼
 Live Application
```

Database is hosted on MongoDB Atlas.

---

## 📸 Screenshots

Add screenshots here:

### Home Page

![Home Page](screenshots/home.png)

### Docker Containers Running

![Docker](screenshots/docker.png)

### Jenkins Successful Build

![Jenkins](screenshots/jenkins-success.png)

---

## 🎯 Learning Outcomes

Through this project, I gained hands-on experience with:

- Full-Stack MERN Development
- REST API Design
- JWT Authentication
- MongoDB Atlas Integration
- Docker Containerization
- Docker Compose Orchestration
- Jenkins CI/CD Pipelines
- GitHub Integration
- Cloud Deployment using Render

---

## 👨‍💻 Author

**Vandya**

GitHub: https://github.com/Vandya12
