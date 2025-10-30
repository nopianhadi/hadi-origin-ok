import { useEffect, useState } from "react";

interface MobilePerformanceOptions {
  reduceAnimations?: boolean;
  optimizeImages?: boolean;
  lazyLoadThreshold?: number;
}

export function useMobilePerformance(options: MobilePerformanceOptions = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast' | 'unknown'>('unknown');

  useEffect(() => {
    // Detect mobile device (optimized check)
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(isMobileDevice);
    };

    // Detect low-end device (enhanced detection)
    const checkDeviceCapability = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      const deviceMemory = (navigator as any).deviceMemory || 1;
      const performanceMemory = (performance as any).memory;
      
      // Enhanced low-end detection
      let isLowEnd = hardwareConcurrency < 2 || deviceMemory < 2;
      
      // Check memory pressure
      if (performanceMemory) {
        const memoryRatio = performanceMemory.usedJSHeapSize / performanceMemory.totalJSHeapSize;
        if (memoryRatio > 0.8) {
          isLowEnd = true;
        }
      }
      
      setIsLowEndDevice(isLowEnd);
    };

    // Detect connection speed (enhanced)
    const checkConnection = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        const slowConnections = ['slow-2g', '2g', '3g'];
        const isSlowConnection = slowConnections.includes(connection.effectiveType) ||
                               connection.downlink < 1.5; // Less than 1.5 Mbps
        setConnectionSpeed(isSlowConnection ? 'slow' : 'fast');
      }
    };

    // Run checks
    checkMobile();
    checkDeviceCapability();
    checkConnection();

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Apply performance optimizations
  useEffect(() => {
    const shouldOptimize = isMobile || isLowEndDevice || connectionSpeed === 'slow';
    
    if (options.reduceAnimations && shouldOptimize) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      document.documentElement.classList.add('reduce-motion');
      
      // Disable complex animations on low-end devices
      if (isLowEndDevice) {
        document.documentElement.classList.add('low-performance');
      }
    }

    // Apply mobile-specific optimizations
    if (isMobile) {
      document.documentElement.classList.add('is-mobile');
      
      // Reduce backdrop blur on mobile for better performance
      document.documentElement.style.setProperty('--mobile-blur', '4px');
    }

    // Apply connection-based optimizations
    if (connectionSpeed === 'slow') {
      document.documentElement.classList.add('slow-connection');
    }
  }, [isMobile, isLowEndDevice, connectionSpeed, options.reduceAnimations]);

  return {
    isMobile,
    isLowEndDevice,
    connectionSpeed,
    shouldReduceAnimations: (isMobile || isLowEndDevice) && options.reduceAnimations,
    shouldOptimizeImages: (connectionSpeed === 'slow' || isLowEndDevice) && options.optimizeImages,
    performanceLevel: isLowEndDevice ? 'low' : isMobile ? 'medium' : 'high',
  };
}