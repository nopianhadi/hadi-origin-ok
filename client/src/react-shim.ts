// React shim to ensure hooks are available globally
import React from 'react';

// Ensure React is available globally for hooks
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

export default React;