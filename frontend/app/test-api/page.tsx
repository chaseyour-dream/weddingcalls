"use client";
import { useEffect, useState } from 'react';

export default function TestApiPage() {
  const [apiUrl, setApiUrl] = useState('');
  const [servicesData, setServicesData] = useState<any>(null);
  const [teamData, setTeamData] = useState<any>(null);
  const [servicesError, setServicesError] = useState<any>(null);
  const [teamError, setTeamError] = useState<any>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL || 'NOT SET';
    setApiUrl(url);
    console.log('API URL:', url);

    // Test Services API
    fetch(`${url}/services/`)
      .then(res => res.json())
      .then(data => {
        console.log('Services data:', data);
        setServicesData(data);
      })
      .catch(err => {
        console.error('Services error:', err);
        setServicesError(err.message);
      });

    // Test Team API
    fetch(`${url}/team/`)
      .then(res => res.json())
      .then(data => {
        console.log('Team data:', data);
        setTeamData(data);
      })
      .catch(err => {
        console.error('Team error:', err);
        setTeamError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Connection Test</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
        <h2>Configuration</h2>
        <p><strong>API URL:</strong> {apiUrl}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', background: servicesError ? '#ffebee' : '#e8f5e9' }}>
        <h2>Services API</h2>
        {servicesError ? (
          <p style={{ color: 'red' }}>Error: {servicesError}</p>
        ) : servicesData ? (
          <>
            <p style={{ color: 'green' }}>✓ Connected successfully!</p>
            <p>Count: {servicesData.count || servicesData.length}</p>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(servicesData, null, 2)}
            </pre>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', background: teamError ? '#ffebee' : '#e8f5e9' }}>
        <h2>Team API</h2>
        {teamError ? (
          <p style={{ color: 'red' }}>Error: {teamError}</p>
        ) : teamData ? (
          <>
            <p style={{ color: 'green' }}>✓ Connected successfully!</p>
            <p>Count: {teamData.count || teamData.length}</p>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(teamData, null, 2)}
            </pre>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
