/**
 * Safe Logger Utility
 * Only logs in development mode, prevents information leakage in production
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (..._args: any[]) => {},
  
  error: (..._args: any[]) => {},
  
  warn: (..._args: any[]) => {},
  
  info: (..._args: any[]) => {},
  
  debug: (..._args: any[]) => {}
};

/**
 * Safe error handler that doesn't expose sensitive information
 */
export const handleError = (error: any, context?: string): string => {
  // no logging; return generic or message depending on env
  // Return generic error message for production
  return isDevelopment 
    ? error?.message || 'An error occurred'
    : 'Something went wrong. Please try again later.';
};
