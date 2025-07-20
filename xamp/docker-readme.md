# Docker Setup for XAMP Project

This document explains how to use Docker and Docker Compose to run the XAMP project.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- External PostgreSQL database (not included in docker-compose)

## Getting Started

1. Clone the repository (if you haven't already)
2. Navigate to the project directory

## Configuration

The Docker setup uses environment variables for configuration. These are loaded from the `.env` file in the project root.

Make sure your `.env` file contains the necessary configuration variables, especially the database connection details:

```
ENVIRONMENT=development
DB_ENGINE=django.db.backends.postgresql
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
```

## Running the Application

To start the application:

```bash
docker-compose up
```

To run in detached mode (background):

```bash
docker-compose up -d
```

To stop the application:

```bash
docker-compose down
```

## Services

The Docker Compose setup includes the following service:

1. **web**: Django application running with Gunicorn
   - Port: 8000
   - Requires an external database (configured via environment variables)

## External Database

This setup requires an external PostgreSQL database. Make sure your database is accessible from the Docker container and update the database connection details in your `.env` file.

## Development Workflow

When developing, you can make changes to your code and they will be reflected in the running application thanks to the volume mounting.

## Database Migrations

The entrypoint script attempts to run migrations when the container starts. If you need to run migrations manually:

```bash
docker-compose exec web python manage.py migrate
```

## Creating a Superuser

The entrypoint script attempts to create a default superuser (username: admin, password: admin) if one doesn't exist. To create a different superuser:

```bash
docker-compose exec web python manage.py createsuperuser
```

## Collecting Static Files

To collect static files:

```bash
docker-compose exec web python manage.py collectstatic --noinput
```

## Viewing Logs

To view logs:

```bash
docker-compose logs
```

To follow logs:

```bash
docker-compose logs -f
```
