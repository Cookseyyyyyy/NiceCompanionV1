import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../utils/api';

const BackendStatusIndicator = () => {
  const [status, setStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading');
  const [message, setMessage] = useState<string>('Checking backend connection...');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await checkBackendHealth();
        setStatus('connected');
        setMessage(response.message || 'Connected to backend');
      } catch (error) {
        setStatus('disconnected');
        setMessage('Cannot connect to backend server');
        console.error('Backend connection error:', error);
      }
    };

    checkConnection();
    // Check connection periodically
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`backend-status ${status}`}>
      <span className="status-indicator"></span>
      <span className="status-message">{message}</span>
    </div>
  );
};

export default BackendStatusIndicator; 