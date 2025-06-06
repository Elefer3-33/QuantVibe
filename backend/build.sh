#!/usr/bin/env bash

# Install TA-Lib C library
apt-get update && apt-get install -y build-essential wget curl

curl -LO http://prdownloads.sourceforge.net/ta-lib/ta-lib-0.4.0-src.tar.gz
tar -xvzf ta-lib-0.4.0-src.tar.gz
cd ta-lib
./configure --prefix=/usr
make
make install
cd ..
rm -rf ta-lib ta-lib-0.4.0-src.tar.gz

chmod +x backend/build.sh

