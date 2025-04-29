FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source files and build
COPY . .
RUN npm run build

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
