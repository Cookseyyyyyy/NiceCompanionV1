/**
 * Utility functions for communicating with the Flask backend
 */

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, API requests go to the same origin
  : 'http://localhost:5000/api';  // In development, target the Flask dev server

/**
 * Generic function to fetch data from the API
 */
export async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}/${endpoint.replace(/^\//, '')}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get health status from the backend
 */
export const checkBackendHealth = () => fetchFromApi('health');

/**
 * Example function to get assets from the backend
 */
export const getAssets = () => fetchFromApi('assets'); 