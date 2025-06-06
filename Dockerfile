FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    wget \
    curl \
    gcc \
    make \
    && rm -rf /var/lib/apt/lists/*


# Copy the entire backend folder into /app/backend
COPY backend/ /app/backend/

# Set working directory to backend root (where build.sh is)
WORKDIR /app/backend

# Make build.sh executable and run it
RUN chmod +x build.sh && ./build.sh

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

