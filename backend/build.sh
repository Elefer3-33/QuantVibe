#!/usr/bin/env bash
set -euo pipefail  # Exit on error, unset var error, and fail on pipe errors
set -x             # Print each command before execution (helps debugging)

# Download TA-lib source code
curl -LO http://prdownloads.sourceforge.net/ta-lib/ta-lib-0.4.0-src.tar.gz

# Extract
tar -xvzf ta-lib-0.4.0-src.tar.gz

# Build and install TA-lib C library
cd ta-lib
./configure --prefix=/usr
make
make install

# Cleanup
cd ..
rm -rf ta-lib ta-lib-0.4.0-src.tar.gz

