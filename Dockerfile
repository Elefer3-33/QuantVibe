FROM python:3.11-slim

# Set working directory early
WORKDIR /app/backend

# Install OS-level dependencies including git
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    wget \
    curl \
    make \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy and run your build script for TA-Lib
COPY backend/build.sh /tmp/build.sh
RUN chmod +x /tmp/build.sh && /tmp/build.sh

# Upgrade pip and install Python dependencies
COPY backend/requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Copy the rest of the backend source code
COPY backend/ /app/backend/

# Expose the port FastAPI will use
EXPOSE 8000

# Start FastAPI app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

