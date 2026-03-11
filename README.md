# User Portal

A fullstack User & Posts Management Portal built with modern technologies and clean architecture principles. This application allows users to authenticate, manage user profiles imported from ReqRes API, and create/manage posts.

## Tech Stack

| Layer              | Technology                                                       |
| ------------------ | ---------------------------------------------------------------- |
| **Frontend**       | Next.js 15, TypeScript, Tailwind CSS, TanStack Query             |
| **Backend**        | NestJS, TypeScript, Prisma ORM                                   |
| **Database**       | PostgreSQL 16                                                    |
| **Authentication** | JWT (httpOnly cookies) + ReqRes API validation                   |
| **Testing**        | Jest (Backend), Vitest (Frontend)                                |
| **Deployment**     | AWS Lambda via Serverless Framework (Backend), Vercel (Frontend) |

## Architecture

### Backend - Hexagonal Architecture

The backend follows **Hexagonal Architecture** (Ports & Adapters pattern) to ensure separation of concerns and maintainability:

- **Domain Layer**: Contains business entities and port interfaces (repository contracts)
- **Application Layer**: Implements use cases and business logic
- **Infrastructure Layer**: Provides adapters for external services (controllers, repositories, DTOs)

This architecture makes the core business logic independent of frameworks, databases, and external services, enabling easy testing and flexibility.

### Frontend - Clean Architecture

The frontend implements **Clean Architecture** with a feature-based structure:

- **Domain Layer**: Defines entities and repository port interfaces
- **Application Layer**: Contains use cases that orchestrate business logic
- **Infrastructure Layer**: Implements repository adapters (API clients)
- **Presentation Layer**: React components, hooks, and UI logic

Each feature (auth, users, posts) is self-contained with its own layers, promoting modularity and scalability.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** 20+ and npm
- **Docker** and Docker Compose
- **AWS CLI** (for backend deployment)
- **Git**

## Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

| Variable          | Description                           | Example                                                    |
| ----------------- | ------------------------------------- | ---------------------------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string          | `postgresql://postgres:postgres@localhost:5432/userportal` |
| `JWT_SECRET`      | Secret key for JWT token signing      | `your-super-secret-jwt-key`                                |
| `REQRES_API_KEY`  | API key for ReqRes API authentication | `your-reqres-api-key`                                      |
| `REQRES_BASE_URL` | Base URL for ReqRes API               | `https://reqres.in/api`                                    |
| `PORT`            | Backend server port (optional)        | `3001`                                                     |

### Frontend (.env.local)

Create a `.env.local` file in the `frontend/` directory:

| Variable                     | Description            | Example                     |
| ---------------------------- | ---------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL`        | Backend API base URL   | `http://localhost:3001/api` |
| `NEXT_PUBLIC_REQRES_API_KEY` | API key for ReqRes API | `your-reqres-api-key`       |

## Getting Started (Local Development)

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone <repository-url>
cd user-portal
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start PostgreSQL database with Docker

```bash
cd ..
docker-compose up -d
```

This will start a PostgreSQL 16 container on port 5432.

### 5. Run Prisma migrations

```bash
cd backend
npx prisma migrate dev
```

This creates the database schema (User and Post tables).

### 6. Start the backend server

```bash
npm run start:dev
```

The backend will run on `http://localhost:3001` with API documentation available at `http://localhost:3001/docs`.

### 7. Start the frontend development server

```bash
cd ../frontend
npm run dev
```

The frontend will run on `http://localhost:3000`.

The user credentials:
email: eve.holt@reqres.in
password: cityslicka

## Running Tests

### Backend Tests (Jest)

```bash
cd backend
npm test                 # Run all tests
```

### Frontend Tests (Vitest)

```bash
cd frontend
npm test                 # Run all tests
```

## API Documentation

The backend provides interactive API documentation using **Swagger/OpenAPI**:

- **Local**: `http://localhost:3001/docs`

The documentation includes all available endpoints, request/response schemas, and authentication requirements.

## Prisma Studio

Visual database browser to inspect and manage data directly:

```bash
cd backend
npx prisma studio
```

- **URL**: `http://localhost:5555`
- Browse Users and Posts tables
- Create, edit, and delete records visually
- Useful for debugging and verifying data persistence

## Project Structure

```
user-portal/
├── backend/                      # NestJS backend application
│   ├── prisma/
│   │   ├── migrations/          # Database migration files
│   │   └── schema.prisma        # Prisma schema definition
│   └── src/
│       ├── auth/                # Authentication module (Hexagonal)
│       │   ├── application/     # Use cases (login)
│       │   ├── domain/          # Ports/interfaces
│       │   └── infrastructure/  # Controllers, DTOs, repositories
│       ├── users/               # Users module (Hexagonal)
│       │   ├── application/     # Use cases (import, get users)
│       │   ├── domain/          # User entity, ports
│       │   └── infrastructure/  # Controllers, repositories, mappers
│       ├── posts/               # Posts module (Hexagonal)
│       │   ├── application/     # Use cases (CRUD operations)
│       │   ├── domain/          # Post entity, ports
│       │   └── infrastructure/  # Controllers, DTOs, repositories
│       ├── shared/              # Shared utilities
│       │   ├── decorators/      # Custom decorators (CurrentUser)
│       │   ├── exceptions/      # Global exception filters
│       │   └── guards/          # JWT authentication guard
│       ├── app.module.ts        # Root application module
│       ├── main.ts              # Application entry point
│       └── prisma.service.ts    # Prisma client service
│
├── frontend/                     # Next.js frontend application
│   ├── public/                  # Static assets
│   └── src/
│       ├── app/                 # Next.js App Router pages
│       │   ├── login/           # Login page
│       │   ├── users/           # Users management page
│       │   ├── posts/           # Posts management page
│       │   └── layout.tsx       # Root layout with providers
│       ├── features/            # Feature modules (Clean Architecture)
│       │   ├── auth/
│       │   │   ├── application/ # Login use case
│       │   │   ├── domain/      # Auth entity, ports
│       │   │   ├── infrastructure/ # API repository
│       │   │   └── presentation/   # LoginForm component, hooks
│       │   ├── users/           # Users feature (same structure)
│       │   └── posts/           # Posts feature (same structure)
│       ├── shared/              # Shared utilities
│       │   ├── components/      # Navbar, Providers
│       │   └── lib/             # Axios client, React Query config
│       └── test/                # Test setup and utilities
│
├── docker-compose.yml           # PostgreSQL database container
└── README.md                    # This file
```

## Key Features

- ✅ **JWT Authentication** with httpOnly cookies for security
- ✅ **User Management** - Import users from ReqRes API and view profiles
- ✅ **Posts Management** - Full CRUD operations for posts
- ✅ **Clean Architecture** - Separation of concerns in both frontend and backend
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **API Documentation** - Interactive Swagger/OpenAPI docs
- ✅ **Database Migrations** - Version-controlled schema with Prisma
- ✅ **Testing** - Unit tests for critical components

## License

This project is private and unlicensed.
