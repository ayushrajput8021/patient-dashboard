# Patient Dashboard Backend

A secure, scalable REST API backend for a Patient Dashboard that allows patients to log in and view personalized weight-loss and shipment data.

## Overview

This backend serves a web-based Patient Dashboard for a healthcare company specializing in weight-loss solutions. It provides API endpoints for authentication, dashboard overview data, weight progress tracking, and shipment information.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Node.js with Express
- **ORM**: Prisma for database interactions
- **Database**: PostgreSQL, containerized with Docker
- **Authentication**: JWT (JSON Web Tokens) stored in HTTP-only cookies
- **Containerization**: Docker and Docker Compose for local setup

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- Git

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd patient-dashboard-backend
```

### 2. Environment Setup

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@db:5432/patient_dashboard
JWT_SECRET=your-secure-jwt-secret-key
```

### 3. Start the Services

Build and start the containers:

```bash
docker-compose up --build
```

This will start both the Node.js application and the PostgreSQL database.

### 4. Initialize the Database

Once the containers are running, in a new terminal window:

```bash
# Run migrations to create the database schema
docker-compose exec backend npm run prisma:migrate

# Seed the database with test data
docker-compose exec backend npm run prisma:seed
```

The application should now be running at http://localhost:3000.

## API Documentation

### Authentication

#### Login

- **URL**: `POST /api/auth/login`
- **Body**:
  ```json
  {
  	"email": "test@acme.com",
  	"password": "Password123!"
  }
  ```
- **Response**:
  ```json
  {
  	"user": {
  		"id": 1,
  		"email": "test@acme.com",
  		"name": "Test Patient"
  	}
  }
  ```
- **Notes**: JWT is stored in an HTTP-only cookie

#### Logout

- **URL**: `POST /api/auth/logout`
- **Response**:
  ```json
  {
  	"success": true,
  	"message": "Logged out successfully"
  }
  ```

### Dashboard

#### Get Dashboard Overview

- **URL**: `GET /api/dashboard`
- **Auth**: Required (JWT cookie)
- **Response**:
  ```json
  {
  	"currentWeight": 175.5,
  	"bmi": 24.8,
  	"nextShipmentDate": "2023-06-15T10:00:00.000Z"
  }
  ```

### Weight Progress

#### Get Weight History

- **URL**: `GET /api/weight-history`
- **Auth**: Required (JWT cookie)
- **Response**: Array of weight entries
  ```json
  [
  	{
  		"id": 1,
  		"weight": 185.2,
  		"bmi": 26.1,
  		"recordedAt": "2023-01-15T08:30:00.000Z"
  	},
  	{
  		"id": 2,
  		"weight": 180.7,
  		"bmi": 25.5,
  		"recordedAt": "2023-02-15T09:15:00.000Z"
  	}
  ]
  ```

### Shipments

#### Get All Shipments

- **URL**: `GET /api/shipments`
- **Auth**: Required (JWT cookie)
- **Response**: Array of shipments
  ```json
  [
  	{
  		"id": 1,
  		"medicationType": "GLP-1",
  		"dosage": "0.5mg",
  		"shipmentDate": "2023-05-10T14:00:00.000Z",
  		"status": "Delivered",
  		"trackingInfo": "TRK1234567US"
  	},
  	{
  		"id": 2,
  		"medicationType": "GLP-1",
  		"dosage": "0.75mg",
  		"shipmentDate": "2023-06-10T14:00:00.000Z",
  		"status": "Pending",
  		"trackingInfo": null
  	}
  ]
  ```

#### Get Current Medication

- **URL**: `GET /api/medication`
- **Auth**: Required (JWT cookie)
- **Response**: Current medication details
  ```json
  {
  	"id": 1,
  	"type": "GLP-1",
  	"dosage": "0.5mg",
  	"startDate": "2023-05-01T00:00:00.000Z",
  	"endDate": "2023-11-01T00:00:00.000Z"
  }
  ```

## Testing

For manual testing, you can use tools like Postman or curl:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@acme.com","password":"Password123!"}' \
  -c cookies.txt

# Get dashboard (using the cookie from login)
curl -X GET http://localhost:3000/api/dashboard \
  -b cookies.txt
```

## Development

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

## Security Notes

- Passwords are hashed using bcrypt
- JWTs are stored in HTTP-only cookies
- All protected routes require authentication
- CORS is configured for secure origins
- HTTP security headers are set using helmet

## License

This project is licensed under the ISC License.
