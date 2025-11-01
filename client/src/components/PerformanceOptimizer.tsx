import { useEffect } from 'react';

/**
 * Performance Optimizer Component
 * Applies runtime optimizations based on device capabilities
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    // Detect device capabilities
    const detectDeviceCapabilities = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const memory = (performance as any).memory;
      
      // Check for low-end device indicators
      const isLowEndDevice = 
        (memory && memory.usedJSHeapSize > memory.totalJSHeapSize * 0.8) ||
        (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) ||
        navigator.hardwareConcurrency <= 2;

      // Check for slow connection
      const isSlowConnection = 
        connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g');

      // Apply optimizations
      if (isLowEndDevice) {
        document.body.classList.add('low-end-device');
        // Disable complex animations
        document.body.classList.add('reduce-motion');
      }

      if (isSlowConnection) {
        document.body.classList.add('slow-connection');
      }

      // Detect mobile
      if (window.innerWidth <= 768) {
        document.body.classList.add('is-mobile');
      }
    };

    // Run detection
    detectDeviceCapabilities();

    // Optimize images based on viewport
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img: any) => {
        if (img.getBoundingClientRect().top < window.innerHeight + 100) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    };

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          optimizeImages();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', detectDeviceCapabilities, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', detectDeviceCapabilities);
    };
  }, []);

  return null;
}

/**
 * Preload critical resources
 */
export function ResourcePreloader() {
  useEffect(() => {
    // Only preload on fast connections
    const connection = (navigator as any).connection;
    const isFastConnection = !connection || 
      (connection.effectiveType === '4g' && connection.saveData !== true);

    if (!isFastConnection) return;

    // Use requestIdleCallback for non-critical preloading
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Preload critical routes
        const criticalRoutes = ['/about', '/contact'];
        
        criticalRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          link.as = 'document';
          document.head.appendChild(link);
        });
      }, { timeout: 2000 });
    }
  }, []);

  return null;
}