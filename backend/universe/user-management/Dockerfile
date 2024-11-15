# Dockerfile for user-management service
FROM python:3.12.4-slim

#Install PostgreSQL development packages
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the application code
COPY src/ .
COPY .env .env

# Expose the port for Django
EXPOSE 8000

# Run the Django application
CMD ["./wait-for-it.sh", "db:5432", "--", "sh", "-c", "python src/manage.py makemigrations users && python src/manage.py migrate && python src/create_oauth_app.py && python src/manage.py runserver 0.0.0.0:8000"]

