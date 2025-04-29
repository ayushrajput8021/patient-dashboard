# Patient Dashboard

A full-stack web application providing a modern, responsive dashboard for patients to track their weight-loss progress and medication shipments.

## Project Structure

This repository contains both the frontend and backend components of the Patient Dashboard:

- **[Frontend](./frontend/README.md)**: A React 19 application with TypeScript, Tailwind CSS, and various modern libraries for state management and UI components.
- **[Backend](./backend/README.md)**: A Node.js API with Express, Prisma ORM, and PostgreSQL database.

## Screenshots

### Login Screen

![Login Screen](./screenshots/Screenshot%202025-04-29%20at%208.58.57 PM.png)

### Dashboard Overview

![Dashboard Overview](./screenshots/Screenshot%202025-04-29%20at%209.00.13 PM.png)

### Weight Progress

![Weight Progress Chart](./screenshots/Screenshot%202025-04-29%20at%209.00.25 PM.png)

### Shipment Tracking

![Shipment Tracking](./screenshots/Screenshot%202025-04-29%20at%209.00.34 PM.png)

## Getting Started

Please refer to the individual README files in the frontend and backend directories for detailed setup instructions:

- [Frontend Setup](./frontend/README.md)
- [Backend Setup](./backend/README.md)

## Development

The project is structured to allow for independent development of the frontend and backend components, with the frontend making API calls to the backend. For local development, you'll need to run both services.

### Running the Complete Stack

1. Start the backend services (API and database):

   ```bash
   cd backend
   docker-compose up
   ```

2. In a separate terminal, start the frontend development server:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Access the application at <http://localhost:5173>

## Technologies

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, React Query, Zustand
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
- **Authentication**: JWT with HTTP-only cookies

For a complete list of dependencies and technologies used, please refer to the respective package.json files in the frontend and backend directories.
