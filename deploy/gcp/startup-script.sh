#!/bin/bash

# Update system packages
apt-get update
apt-get upgrade -y

# Install Docker and Docker Compose
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce docker-compose

# Clone repository (replace with your repository URL)
git clone https://github.com/yourusername/growthbdm.git /app

# Set up environment variables
cd /app
cp .env.example .env

# Start application
docker-compose up -d