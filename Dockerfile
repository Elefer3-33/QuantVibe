# Use official Python slim image
FROM python:3.11-slim

# Install system dependencies for building TA-lib and Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    wget \
    curl \
    gcc \
    make \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app/backend

# Copy backend folder contents into container
COPY backend/ ./backend/

# Set working directory to where build.sh is
WORKDIR /app/backend/backend

# Make build.sh executable and run it to build and install TA-lib locally and install dependencies
RUN chmod +x ../build.sh && ../build.sh

# Expose port your FastAPI app runs on
EXPOSE 8000

# Run the app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
