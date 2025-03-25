'use client';

import { useEffect, useState } from 'react';

export default function EnvCheck() {
  const [envStatus, setEnvStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function checkEnv() {
      try {
        setLoading(true);
        const response = await fetch('/api/env-check');
        const data = await response.json();
        setEnvStatus(data);
      } catch (error) {
        setEnvStatus({ error: error.message });
      } finally {
        setLoading(false);
      }
    }
    
    checkEnv();
  }, []);
  
  return (
    <div className="bg-black text-white p-4 rounded border border-red-500">
      <h2 className="text-xl font-bold mb-2">Environment Variables Check</h2>
      {loading ? (
        <p>Loading environment status...</p>
      ) : envStatus?.error ? (
        <p className="text-red-500">Error: {envStatus.error}</p>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <p>SPOTIFY_CLIENT_ID: {envStatus?.spotify_id ? '✅' : '❌'}</p>
              {envStatus?.spotify_id_masked && (
                <p className="text-xs text-gray-400">Value: {envStatus.spotify_id_masked}</p>
              )}
            </div>
            <div>
              <p>SPOTIFY_CLIENT_SECRET: {envStatus?.spotify_secret ? '✅' : '❌'}</p>
              {envStatus?.spotify_secret_masked && (
                <p className="text-xs text-gray-400">Value: {envStatus.spotify_secret_masked}</p>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="font-medium mb-1">Configuration Status:</p>
            <ul className="text-sm list-disc pl-5">
              <li>Environment variables loaded: {envStatus?.spotify_id && envStatus?.spotify_secret ? 'Yes' : 'No'}</li>
              <li>next.config.js env configuration: {envStatus?.next_config_enabled ? 'Enabled' : 'Not detected'}</li>
            </ul>
          </div>
          
          <div className="mb-2">
            <p className="font-medium">Available environment keys:</p>
            <div className="bg-zinc-900 p-2 rounded text-xs">
              {envStatus?.env_keys?.length > 0 ? (
                <ul className="list-disc pl-5">
                  {envStatus.env_keys.map(key => (
                    <li key={key}>{key}</li>
                  ))}
                </ul>
              ) : (
                <p>No relevant environment keys found</p>
              )}
            </div>
          </div>
          
          <div className="text-xs mt-2 bg-zinc-900 p-2 rounded max-h-20 overflow-auto">
            <pre>{JSON.stringify(envStatus, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
} 