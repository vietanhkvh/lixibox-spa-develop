import { RefObject, useEffect, useRef, useState } from 'react';

interface Options extends IntersectionObserverInit {
  rootMargin?: string;
}
interface UseOnScreenReturn {
  /**
   * ref [ReadOnly] - Do not set this property manually. Use `setRef` instead.
   *
   * Example: `ref.current?.play()`
   */
  ref: RefObject<HTMLVideoElement>;
  /**
   * setRef - Sets observer target and starts observing.
   *
   * Example: `<video ref={setRef} />`
   */
  setRef: (node: HTMLVideoElement) => void;
  /**
   * isVisible [ReadOnly] - Returns true if the target element intersects with the intersection observer's root element or root viewport.
   */
  isVisible: boolean;
}
export const useOnScreen = (options: Options): UseOnScreenReturn => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver>(
    new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        ...options
      }
    )
  );
  const setRef = (node: HTMLVideoElement) => {
    if (!ref.current) {
      ref.current = node;
      observerRef.current?.observe(ref.current);
    }
  };

  useEffect(() => {
    return () => observerRef.current && ref.current && observerRef.current.unobserve(ref.current);
  }, []);

  return { ref, setRef, isVisible };
};
