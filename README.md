# Docker Hello World — Node + Vite + React 

## Quick Start 

```bash
docker compose up --build 
```

Then open → http://localhost:5173

---

## Project Structure

```
docker-hello/
├── backend/
│   ├── index.js          # Express API
│   ├── package.json
│   └── Dockerfile        # Backend container recipe
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── App.jsx       # React UI
│   ├── index.html
│   ├── vite.config.js    # Proxies /api → backend container
│   ├── package.json
│   └── Dockerfile        # Frontend container recipe
├── docker-compose.yml    # Orchestrates both containers
└── README.md
```

---

## Docker Concepts Used

### 1. Dockerfile
A recipe that tells Docker how to build a container image.

Key instructions:
- `FROM node:20-alpine` — start from an official Node image (Alpine = tiny Linux)
- `WORKDIR /app` — set the working directory inside the container
- `COPY package*.json ./` — copy package files first (enables layer caching)
- `RUN npm install` — install dependencies *inside* the container, no local node_modules needed
- `COPY . .` — copy source code into the container
- `EXPOSE 3001` — document which port the container uses
- `CMD ["node", "index.js"]` — default command to run when container starts

### 2. Layer Caching
Copying `package.json` before source code means Docker only re-runs `npm install`
when dependencies change, not on every code change. Speeds up rebuilds significantly.

### 3. docker-compose.yml
Defines and orchestrates multiple containers as a single application.

Key concepts:
- `build: ./backend` — build image from that folder's Dockerfile
- `ports: "3001:3001"` — map host port → container port (host:container)
- `depends_on: backend` — start backend before frontend
- `networks` — containers on the same network can reach each other by **service name** (`http://backend:3001`)

### 4. Container Networking
The Vite config proxies `/api` calls to `http://backend:3001`.
`backend` resolves as a hostname because both containers share `app-network`.
From your browser you never need to know the container's IP.

### 5. No Local Dependencies
You don't need Node.js or npm installed on your machine.
Docker pulls the Node image and runs `npm install` inside the container.

---

## Useful Commands

| Command | What it does |
|---|---|
| `docker compose up --build` | Build images & start all containers |
| `docker compose up` | Start without rebuilding |
| `docker compose down` | Stop and remove containers |
| `docker compose logs -f` | Tail logs from all containers |
| `docker ps` | List running containers |
| `docker images` | List built images |
