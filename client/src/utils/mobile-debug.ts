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
    
    // For internal links, use a small delay to ensure smooth transition
    if (href.startsWith('/')) {
      setTimeout(() => {
        window.location.href = href;
      }, 100);
      return;
    }
    
    // For hash links (same page)
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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