import { useEffect, useState } from 'react';

interface UseActiveSectionOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook untuk detect section mana yang sedang terlihat di viewport
 * Digunakan untuk active state di navigation menu
 */
export function useActiveSection(
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
) {
  const { threshold = 0.5, rootMargin = '-20% 0px -35% 0px' } = options;
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
      observers.set(sectionId, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
}
