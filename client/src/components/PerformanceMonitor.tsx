import { useEffect } from "react";
import { useMobilePerformance } from "@/hooks/use-mobile-performance";
import { logger } from "@/lib/logger";

export default function PerformanceMonitor() {
  const { isMobile, isLowEndDevice, connectionSpeed } = useMobilePerformance({
    reduceAnimations: true,
    optimizeImages: true,
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          logger.log('Page Load Time:', navEntry.loadEventEnd - navEntry.fetchStart);
        }
        
        if (entry.entryType === 'paint') {
          logger.log(`${entry.name}:`, entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation', 'paint'] });

    // Monitor FPS for mobile devices
    if (isMobile) {
      let lastTime = performance.now();
      let frames = 0;

      const measureFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frames * 1000) / (currentTime - lastTime));
          
          if (fps < 30) {
            logger.warn('Low FPS detected:', fps);
            // Apply additional performance optimizations
            document.documentElement.classList.add('low-performance');
          }
          
          frames = 0;
          lastTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
      };

      requestAnimationFrame(measureFPS);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Apply performance classes based on device capabilities
  useEffect(() => {
    const classes: string[] = [];
    
    if (isMobile) classes.push('is-mobile');
    if (isLowEndDevice) classes.push('low-end-device');
    if (connectionSpeed === 'slow') classes.push('slow-connection');
    
    document.documentElement.classList.add(...classes);
    
    return () => {
      document.documentElement.classList.remove(...classes);
    };
  }, [isMobile, isLowEndDevice, connectionSpeed]);

  return null;
}