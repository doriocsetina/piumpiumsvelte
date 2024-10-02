# Stage 1: Build the Svelte app
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Debugging step: List the contents of the build directory
RUN ls -la /app/dist

# Stage 2: Serve the built app
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "dist"]