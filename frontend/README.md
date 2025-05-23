# Patient Dashboard Frontend

A modern, responsive, and accessible frontend for a Patient Dashboard that allows patients to log in and view personalized weight-loss and shipment data.

## Project Overview

This project is a React-based frontend for a healthcare company specializing in weight-loss solutions. It provides a dashboard for patients to track their weight progress, view medication shipments, and access personalized health information.

### Features

- Secure user authentication (login form with email/password).
- Dashboard overview (current weight, BMI, next shipment date, progress snapshot).
- Weight progress (line chart showing historical weight data).
- Shipment tracking (table or accordion for past/upcoming shipments, medication details).
- Responsive design that works across desktop, tablet, and mobile devices.

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**:
  - Tanstack React Query 5 (server state)
  - Zustand 5 (client state)
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 20 or higher
- npm 10 or higher

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Copy the environment variables file:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Mock API

This prototype uses mock data defined in `src/lib/api.ts`. In a production environment, you would replace these with actual API calls to your backend. Currently, the mock data includes:

- Weight entries over time
- Medication information
- Shipment history
- User authentication

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier (formats all TS/JS files in the src directory)

## Accessibility

This application follows WCAG 2.1 AA guidelines to ensure accessibility for all users:

- Keyboard navigation for all interactive elements
- ARIA attributes where appropriate
- Sufficient color contrast (4.5:1 ratio minimum)
- Semantic HTML structure
- Screen reader compatibility

Testing has been performed with keyboard navigation and screen reader simulation to ensure accessibility compliance.
