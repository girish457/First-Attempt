import React from 'react';

// Hook for scroll animations with staggered delays
export function useScrollAnimation({ threshold = 0.1, staggerDelay = 100 } = {}) {
  const elementsRef = React.useRef([]);
  const [animatedElements, setAnimatedElements] = React.useState(new Set());

  const addToRefs = React.useCallback((el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const delay = index * staggerDelay;
            
            setTimeout(() => {
              element.classList.add('animate-in');
              setAnimatedElements(prev => new Set([...prev, element]));
            }, delay);
            
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    elementsRef.current.forEach((el) => {
      if (el && !animatedElements.has(el)) {
        observer.observe(el);
      }
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [threshold, staggerDelay, animatedElements]);

  return { addToRefs };
}

// Hook for single element scroll animation
export function useScrollAnimationSingle({ threshold = 0.1 } = {}) {
  const elementRef = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          elementRef.current?.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return { elementRef, isVisible };
}