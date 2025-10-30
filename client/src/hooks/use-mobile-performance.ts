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
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    // Detect low-end device
    const checkDeviceCapability = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      const deviceMemory = (navigator as any).deviceMemory || 1;
      
      // Consider low-end if less than 2 cores or less than 2GB RAM
      const isLowEnd = hardwareConcurrency < 2 || deviceMemory < 2;
      setIsLowEndDevice(isLowEnd);
    };

    // Detect connection speed
    const checkConnection = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      if (connection) {
        const slowConnections = ['slow-2g', '2g', '3g'];
        const isSlowConnection = slowConnections.includes(connection.effectiveType);
        setConnectionSpeed(isSlowConnection ? 'slow' : 'fast');
      }
    };

    checkMobile();
    checkDeviceCapability();
    checkConnection();

    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Apply performance optimizations
  useEffect(() => {
    if (options.reduceAnimations && (isMobile || isLowEndDevice)) {
      document.documentElement.style.setProperty('--animation-duration', '0.2s');
      document.documentElement.classList.add('reduce-motion');
    }
  }, [isMobile, isLowEndDevice, options.reduceAnimations]);

  return {
    isMobile,
    isLowEndDevice,
    connectionSpeed,
    shouldReduceAnimations: (isMobile || isLowEndDevice) && options.reduceAnimations,
    shouldOptimizeImages: (connectionSpeed === 'slow' || isLowEndDevice) && options.optimizeImages,
  };
}