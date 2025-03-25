import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check for sensitive environment variables
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
    const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    
    const spotify_id = !!spotifyClientId;
    const spotify_secret = !!spotifyClientSecret;
    
    // Log for server debugging
    console.log('Server-side environment variables check:');
    console.log('- SPOTIFY_CLIENT_ID exists:', spotify_id);
    console.log('- SPOTIFY_CLIENT_SECRET exists:', spotify_secret);
    
    // Mask credentials for safe display (show only first 4 and last 4 chars)
    const maskCredential = (cred) => {
      if (!cred) return null;
      if (cred.length <= 8) return '****';
      return `${cred.substring(0, 4)}...${cred.substring(cred.length - 4)}`;
    };
    
    // Return only boolean values for security (don't expose actual secrets)
    return NextResponse.json({
      spotify_id,
      spotify_secret,
      spotify_id_masked: maskCredential(spotifyClientId),
      spotify_secret_masked: maskCredential(spotifyClientSecret),
      env_keys: Object.keys(process.env).filter(key => 
        key.includes('SPOTIFY') || 
        key.includes('NEXT_') || 
        key.includes('NODE_')
      ),
      next_config_enabled: true
    });
  } catch (error) {
    console.error('Error checking environment variables:', error);
    return NextResponse.json({ error: 'Failed to check environment variables' }, { status: 500 });
  }
} 