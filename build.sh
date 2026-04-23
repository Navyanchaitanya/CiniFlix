#!/usr/bin/env bash
# Build script for Render deployment

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy --skip-generate

# Build the application
npm run build
