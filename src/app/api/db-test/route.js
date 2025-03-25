import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';

/**
 * GET /api/db-test
 * Simple test route to check MongoDB connection
 */
export async function GET() {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Get connection state
    const connectionState = mongoose.connection.readyState;
    
    // List all collections
    const collections = Object.keys(mongoose.connection.collections);
    
    // Get database name
    const dbName = mongoose.connection.db.databaseName;
    
    // Mask connection string for security
    const connectionString = process.env.MONGODB_URI || 'Not set';
    const maskedUri = connectionString.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://$2:****@');
    
    return NextResponse.json({
      success: true,
      connection: {
        state: connectionState,
        stateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][connectionState],
        database: dbName,
        collections,
        uri: maskedUri
      }
    });
  } catch (error) {
    console.error('DB Test Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
} 