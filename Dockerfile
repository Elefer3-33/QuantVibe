FROM python:3.11-slim

# Install OS-level dependencies required for TA-Lib and Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    wget \
    curl \
    make \
    && rm -rf /var/lib/apt/lists/*

# Build and install TA-Lib
COPY backend/build.sh /tmp/build.sh
RUN chmod +x /tmp/build.sh && /tmp/build.sh

# Copy and install Python dependencies
COPY backend/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Copy the application code
COPY backend/ /app/backend/
WORKDIR /app/backend

# Expose port used by uvicorn
EXPOSE 8000

# Start FastAPI app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 
