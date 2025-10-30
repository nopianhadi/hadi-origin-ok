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
    // Preload critical routes
    const criticalRoutes = ['/about', '/contact'];
    
    criticalRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });

    // Preload critical images on idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        const criticalImages: string[] = [
          // Add critical image URLs here
        ];
        
        criticalImages.forEach((src: string) => {
          const img = new Image();
          img.src = src;
        });
      });
    }
  }, []);

  return null;
}