/**
 * Database initialization helper
 * Checks if database is ready and handles connection errors gracefully
 */

import { prisma } from './prisma';

export async function isDatabaseReady() {
  try {
    // Try to connect to database with a simple query
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection error:', error.message);
    return false;
  }
}

export async function initializeDatabase() {
  try {
    const ready = await isDatabaseReady();
    if (!ready) {
      console.warn('⚠️  Database is not ready. Some features may not work.');
      return false;
    }
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

export async function getHealthStatus() {
  try {
    const dbReady = await isDatabaseReady();
    return {
      status: dbReady ? 'healthy' : 'degraded',
      database: dbReady ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      database: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}
