// Mobile debugging utilities
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const getDeviceInfo = () => {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    isMobile: isMobile(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    touchSupport: 'ontouchstart' in window,
  };
};

export const logMobileDebug = (component: string, action: string, data?: any) => {
  // no-op to prevent console logging in production and development
};

export const handleMobileNavigation = (href: string, callback?: () => void) => {
  try {
    logMobileDebug('Navigation', 'Attempting navigation', { href });
    
    if (callback) callback();
    
    // For external links
    if (href.startsWith('http')) {
      window.open(href, '_blank');
      return;
    }
    
    // For hash links with path (e.g., /#services)
    if (href.includes('/#')) {
      // Check if we're already on the home page
      if (window.location.pathname === '/') {
        // Just scroll to the section
        const hash = href.split('#')[1];
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else {
        // Navigate to home page with hash
        setTimeout(() => {
          window.location.href = href;
        }, 100);
      }
      return;
    }
    
    // For hash links (same page)
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return;
    }
    
    // For internal page links, use a small delay to ensure smooth transition
    if (href.startsWith('/')) {
      setTimeout(() => {
        window.location.href = href;
      }, 100);
      return;
    }
    
    // Fallback
    window.location.href = href;
    
  } catch (error) {
    logMobileDebug('Navigation', 'Error', { href, error });
    // Fallback to normal navigation
    window.location.href = href;
  }
};