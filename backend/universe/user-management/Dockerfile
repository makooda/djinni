# Dockerfile for user-management service
FROM python:3.12-alpine

# Install build dependencies and PostgreSQL client libs
RUN apk update && apk add --no-cache \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    libffi-dev \
    build-base \
    bash

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY src/ .
COPY .env .
COPY entrypoint.sh .
COPY wait-for-it.sh .

# Ensure scripts are executable
RUN chmod +x entrypoint.sh wait-for-it.sh

# Expose Django's default port
EXPOSE 8000

# Run entrypoint script
CMD ["./entrypoint.sh"]
