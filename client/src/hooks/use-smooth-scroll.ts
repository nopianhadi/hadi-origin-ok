import { useEffect } from 'react';

interface UseSmoothScrollOptions {
  offset?: number;
  duration?: number;
}

/**
 * Hook untuk enable smooth scrolling ke anchor links
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { offset = 80, duration = 800 } = options;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) return;

      e.preventDefault();

      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Update URL without jumping
      window.history.pushState({}, '', href);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [offset, duration]);
}
