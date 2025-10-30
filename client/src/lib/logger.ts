/**
 * Safe Logger Utility
 * Only logs in development mode, prevents information leakage in production
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  }
};

/**
 * Safe error handler that doesn't expose sensitive information
 */
export const handleError = (error: any, context?: string): string => {
  if (isDevelopment) {
    console.error(`Error in ${context || 'unknown context'}:`, error);
  }
  
  // Return generic error message for production
  return isDevelopment 
    ? error?.message || 'An error occurred'
    : 'Something went wrong. Please try again later.';
};
