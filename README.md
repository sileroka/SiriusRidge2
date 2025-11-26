# SiriusRidge2

A full-stack application built with Python/FastAPI backend and Angular/PrimeNG frontend.

## Features

- **Calendar Management** - Manage your calendar events
- **Todo List** - Track your tasks and to-do items
- **Inventory Management** - Keep track of your inventory
- **Recipe Management** - Store and manage your recipes

## Tech Stack

### Backend
- Python 3.11
- FastAPI
- Uvicorn

### Frontend
- Angular 17
- PrimeNG
- SCSS

### Infrastructure
- Docker & Docker Compose
- Nginx (production)
- Digital Ocean (deployment)

## Project Structure

```
SiriusRidge2/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── calendar.py
│   │   │       ├── todolist.py
│   │   │       ├── inventory.py
│   │   │       └── recipe.py
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   ├── calendar/
│   │   │   │   ├── todolist/
│   │   │   │   ├── inventory/
│   │   │   │   └── recipe/
│   │   │   ├── shared/
│   │   │   └── core/
│   │   └── styles.scss
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── docker-compose.dev.yml
└── README.md
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)

### Running with Docker

**Production build:**
```bash
docker-compose up --build
```

**Development mode:**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Local Development

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run start
```

## API Endpoints

- **Calendar**: `/api/calendar`
- **Todolist**: `/api/todolist`
- **Inventory**: `/api/inventory`
- **Recipe**: `/api/recipe`

## Deployment

This application is configured to be deployed on Digital Ocean using Docker containers.

### Digital Ocean App Platform

1. Connect your GitHub repository
2. Configure the app with the docker-compose.yml
3. Set environment variables as needed
4. Deploy

## License

MIT