# Stage 1: Build frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
RUN npm ci

COPY frontend/ frontend/
RUN npm -w frontend run build

# Stage 2: Build backend
FROM node:22-alpine AS backend-builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci

COPY backend/ backend/
RUN npm -w backend run build

# Stage 3: Production
FROM node:22-alpine
WORKDIR /app

# Copy package files and install production deps only
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci --omit=dev 2>/dev/null || npm ci --production

# Copy backend dist
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package.json ./backend/

# Copy frontend dist
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "backend/dist/index.js"]
