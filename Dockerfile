# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy project files
COPY pyproject.toml poetry.lock ./

# Install project dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# Copy the rest of the application code
COPY src/ ./src/

# Run as a non-root user
RUN useradd -m myuser
USER myuser

# Expose the port the app runs on
EXPOSE ${PORT}

# Set the entrypoint
CMD exec gunicorn --bind :${PORT} --workers 1 --threads 8 --timeout 0 src.app:app