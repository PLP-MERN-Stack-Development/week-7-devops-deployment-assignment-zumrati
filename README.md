# MERN Stack Task Management Application

A full-stack task management application built with MongoDB, Express.js, React, and Node.js. This production-ready application includes comprehensive CI/CD pipelines, monitoring, and deployment configurations.

## 🚀 Live Demo

- **Frontend:** [https://your-app.netlify.app](https://your-app.netlify.app)
- **Backend API:** [https://your-api.render.com](https://your-api.render.com)
- **API Documentation:** [https://your-api.render.com/api/health](https://your-api.render.com/api/health)

## ✨ Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication with registration and login
- **Task Management**: Create, read, update, and delete tasks with status tracking
- **Task Organization**: Categorize tasks by priority, status, and custom categories
- **Dashboard**: Real-time statistics and task overview
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live task updates and notifications

### Production Features
- **Security**: Helmet.js security headers, rate limiting, input validation
- **Performance**: Compression, caching, database indexing
- **Monitoring**: Health checks, logging, error tracking
- **Scalability**: Database connection pooling, optimized queries

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Winston** for logging
- **Helmet** for security
- **Express Rate Limit** for API protection

### DevOps & Deployment
- **GitHub Actions** for CI/CD
- **Docker** for containerization
- **Netlify** for frontend deployment
- **Render** for backend deployment
- **MongoDB Atlas** for database hosting

## 🏗️ Project Structure

```
mern-fullstack-app/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── scripts/           # Database scripts
│   └── server.js          # Entry point
├── src/                   # Frontend application
│   ├── components/        # Reusable components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── App.tsx            # Main app component
├── .github/workflows/     # CI/CD pipelines
├── docker-compose.yml     # Local development setup
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mern-fullstack-app.git
   cd mern-fullstack-app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ..
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   npm run dev
   ```

4. **Using Docker (Alternative)**
   ```bash
   docker-compose up -d
   ```

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info
```

#### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TaskFlow
VITE_APP_VERSION=1.0.0
```

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure environment variables:**
   - `NODE_ENV=production`
   - `MONGODB_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_production_jwt_secret`
   - `FRONTEND_URL=your_frontend_url`

4. **Deploy using render.yaml**
   ```yaml
   services:
     - type: web
       name: mern-backend
       env: node
       buildCommand: npm install
       startCommand: npm start
       healthCheckPath: /api/health
   ```

### Frontend Deployment (Netlify)

1. **Connect your GitHub repository to Netlify**
2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Set environment variables:**
   - `VITE_API_URL=your_backend_url`
4. **Configure redirects in netlify.toml**

### Database Setup (MongoDB Atlas)

1. **Create a MongoDB Atlas cluster**
2. **Create a database user with read/write permissions**
3. **Whitelist your application's IP addresses**
4. **Get connection string and update environment variables**

## 🔄 CI/CD Pipeline

The application includes comprehensive GitHub Actions workflows:

### CI Pipeline
- **Code Quality**: ESLint for both frontend and backend
- **Testing**: Automated test suites with MongoDB service
- **Security**: Trivy vulnerability scanning
- **Build**: Automated build process with artifact storage

### CD Pipeline
- **Staging**: Auto-deploy to staging on `develop` branch
- **Production**: Auto-deploy to production on `main` branch
- **Health Checks**: Automated health monitoring
- **Notifications**: Slack notifications for deployment status

### Required Secrets

Add these secrets to your GitHub repository:

```
# Netlify
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_STAGING_SITE_ID=staging_site_id
NETLIFY_PROD_SITE_ID=production_site_id

# Render
RENDER_API_KEY=your_render_api_key
RENDER_STAGING_SERVICE_ID=staging_service_id
RENDER_PROD_SERVICE_ID=production_service_id

# Application URLs
FRONTEND_URL=https://your-app.netlify.app
BACKEND_URL=https://your-api.render.com/api
VITE_API_URL=https://your-api.render.com/api

# Notifications (optional)
SLACK_WEBHOOK_URL=your_slack_webhook
```

## 📊 Monitoring & Maintenance

### Health Checks
- **Frontend**: Automated uptime monitoring
- **Backend**: Health check endpoint at `/api/health`
- **Database**: Connection status monitoring

### Logging
- **Winston**: Structured logging with different levels
- **Request Logging**: Morgan for HTTP request logging
- **Error Tracking**: Comprehensive error handling and logging

### Performance Monitoring
- **Database**: Connection pooling and query optimization
- **API**: Rate limiting and response time monitoring
- **Frontend**: Bundle size optimization and caching strategies

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## 🛡️ Security Features

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control
- **Input Validation**: Express-validator for request validation
- **Security Headers**: Helmet.js for HTTP headers
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Configured for secure cross-origin requests
- **Password Hashing**: bcryptjs with salt rounds

## 📈 Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: MongoDB connection pooling
- **Compression**: Gzip compression for responses
- **Caching**: Static asset caching with appropriate headers
- **Code Splitting**: Lazy loading for React components
- **Bundle Optimization**: Vite build optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues]$ https://github.com/PLP-MERN-Stack-Development/week-7-devops-deployment-assignment-zumrati.git'
 page
2. Create a new issue with detailed information
3. Join our [Discord Community](https://discord.gg/your-discord) for real-time support

## 🙏 Acknowledgments

- React team for the amazing frontend framework
- Express.js team for the robust backend framework
- MongoDB team for the flexible database solution
- All contributors who have helped improve this project

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Task Management
![Tasks](https://via.placeholder.com/800x400?text=Task+Management+Screenshot)

### Mobile Responsive
![Mobile](https://via.placeholder.com/400x600?text=Mobile+View+Screenshot)

---

**Built with ❤️ by Zumrati(https://github.com/zumrati)**