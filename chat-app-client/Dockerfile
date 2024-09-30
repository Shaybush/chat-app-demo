FROM node:latest

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the package.json and package-lock.json (or pnpm-lock.yaml)
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Expose the port your application runs on (assuming it's using Vite, for example)
EXPOSE 5173

# Start the application (use pnpm instead of npm if you're using pnpm)
CMD ["pnpm", "start"]
