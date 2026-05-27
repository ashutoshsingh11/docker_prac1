# Use official Node.js image as base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (layer caching: only re-install if deps change)
COPY package*.json ./

# Install dependencies inside the container (no local node_modules needed)
RUN npm install

# Copy rest of the source code
COPY . .

# Expose the port this service runs on
EXPOSE 3001

# Command to start the server
CMD ["node", "index.js"]
