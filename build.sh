#!/usr/bin/env bash
# Build script for Render deployment

set -e

echo "🚀 Starting CiniFlix deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy --skip-generate

# Seed database with sample data (optional, comment out if not needed)
echo "🌱 Seeding database with sample movies..."
npm run prisma:seed || true  # Continue even if seed fails

# Build the application
echo "🏗️  Building application..."
npm run build

echo "✅ Build completed successfully!"
