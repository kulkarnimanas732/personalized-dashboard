
'use client' // If using App Router

import { useEffect } from 'react';



export default function TestEnvPage() {
   
  useEffect(() => {
    console.log('=== CLIENT-SIDE ENV TEST ===');
    console.log('API Key:', process.env.NEXT_PUBLIC_NEWS_API_KEY);
  
    console.log('All NEXT_PUBLIC variables:', 
      Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC'))
    );
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Environment Variable Test</h1>
      <div>
        <strong>API Key Status:</strong> {apiKey ? '✅ Found' : '❌ Not Found'}
      </div>
      <div>
        <strong>API Key Length:</strong> {apiKey?.length || 0}
      </div>
      <div>
        <strong>API Key Preview:</strong> {apiKey ? `${apiKey.substring(0, 8)}...` : 'N/A'}
      </div>
      <div>
        <strong>Environment:</strong> {process.env.NODE_ENV}
      </div>
      <div>
        <strong>All NEXT_PUBLIC vars:</strong>{' '}
        {Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')).join(', ') || 'None found'}
      </div>
    </div>
  );
}