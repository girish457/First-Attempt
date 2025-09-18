import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Provides smooth, staggered animations for elements as they enter viewport
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -20px 0px',
    triggerOnce = false,
    staggerDelay = 50,
  } = options;

  const elementsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const elements = elementsRef.current;
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Add staggered animation classes
            const index = elements.indexOf(entry.target);
            const delay = index * staggerDelay;
            
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else {
            // Remove animation class when element leaves viewport
            entry.target.classList.remove('animate-in');
            if (!triggerOnce) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [threshold, rootMargin, triggerOnce, staggerDelay]);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return { addToRefs, isVisible };
};

/**
 * Simple scroll animation hook for single elements
 */
export const useScrollAnimationSingle = (options = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -20px 0px',
    triggerOnce = false,
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          element.classList.add('animate-in');
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else {
          // Remove animation class when element leaves viewport
          setIsVisible(false);
          element.classList.remove('animate-in');
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
};