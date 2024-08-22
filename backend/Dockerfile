FROM python:3.11-slim

WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy project files
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-dev

COPY src/ ./src/

# Expose Flask port
EXPOSE 8080

# Set entry point
CMD ["poetry", "run", "python", "src/app.py"]