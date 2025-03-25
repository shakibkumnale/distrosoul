import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';

/**
 * GET /api/db-check
 * Check if the MongoDB connection is working
 */
export async function GET() {
  try {
    // Try to connect to the database
    await connectToDatabase();
    
    // Check connection state
    const connectionState = mongoose.connection.readyState;
    
    // Interpret the connection state
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    
    const status = states[connectionState] || 'unknown';
    
    // Get database name
    const dbName = mongoose.connection.name || 'No database selected';
    
    // Check configured connection string (mask it for security)
    const connectionString = process.env.MONGODB_URI || 'Not configured';
    const maskedUri = connectionString ? 
      connectionString.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://$2:****@') : 
      'Not available';
    
    return NextResponse.json({
      status: status === 'connected' ? 'ok' : 'error',
      connection: {
        state: status,
        database: dbName,
        uri: maskedUri,
      },
      message: status === 'connected' ? 
        'Successfully connected to MongoDB' : 
        `Database is ${status}. Please check your connection string.`
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: `Failed to connect to database: ${error.message}`,
      error: error.message
    }, { status: 500 });
  }
} 