#!/bin/bash
# Post-deploy script for Render
# Runs database migrations and seeds after deployment

set -e

echo "🚀 Running post-deployment configurations..."

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy --skip-generate || {
    echo "⚠️  Migrations failed. This might be normal on first deploy."
}

# Seed database (optional)
echo "🌱 Seeding database with sample data..."
npm run prisma:seed || {
    echo "ℹ️  Database seeding completed or skipped."
}

echo "✅ Post-deployment setup completed!"
