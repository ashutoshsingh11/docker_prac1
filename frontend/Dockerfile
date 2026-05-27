# Use official Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install ALL dependencies inside the container
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server (--host makes it accessible outside container)
CMD ["npm", "run", "dev"]
