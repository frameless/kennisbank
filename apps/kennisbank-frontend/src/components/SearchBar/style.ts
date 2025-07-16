import { CSSProperties } from 'react';

export const styles = {
  container: {
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  } as CSSProperties,
  optimisticItem: {
    color: '#6B7280', // gray-500
    fontStyle: 'italic',
    marginBottom: '0.25rem',
  } as CSSProperties,
  form: {
    marginBottom: '1rem',
    display: 'flex',
    gap: '0.5rem',
  } as CSSProperties,
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: 1,
  } as CSSProperties,
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3B82F6', // blue-500
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  } as CSSProperties,
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  } as CSSProperties,
  resultItem: {
    border: '1px solid #e5e7eb', // gray-200
    padding: '0.75rem',
    borderRadius: '4px',
  } as CSSProperties,
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  } as CSSProperties,
  resultDescription: {
    fontSize: '0.875rem',
    color: '#4B5563', // gray-600
    marginBottom: '0.25rem',
  } as CSSProperties,
  resultLink: {
    color: '#2563EB', // blue-600
    textDecoration: 'underline',
    fontSize: '0.875rem',
  } as CSSProperties,
};
