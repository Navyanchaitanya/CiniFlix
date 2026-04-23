/**
 * Health Check API Endpoint
 * Used to monitor application and database status
 */

import { getHealthStatus } from '@/lib/db-health';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const health = await getHealthStatus();
    
    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json(health, { status: statusCode });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
