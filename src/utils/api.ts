/**
 * Utility functions for communicating with the Flask backend
 */

import { API_BASE_URL } from '../config';

/**
 * Generic function to fetch data from the API
 */
export async function fetchFromApi(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Get health status from the backend
 */
export async function checkBackendHealth() {
  return fetchFromApi('/api/health');
}

/**
 * Example function to get assets from the backend
 */
export const getAssets = () => fetchFromApi('assets');

/**
 * Get detailed diagnostic information from the backend
 */
export async function getDiagnostics() {
  return fetchFromApi('/api/diagnostics');
} 