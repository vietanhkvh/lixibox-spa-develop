import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { usePrevious } from './hook';

interface ObserveVisibilityProps {
  children: React.FC<{ isVisible: boolean }>;
  root?: React.RefObject<HTMLElement>; // Enclosing element in which this component is being scrolled
  rootMargin?: string; // Identical to CSS margin (e.g. '10px', '0px 10px 0px 20px')
  threshold?: number;
  classes?: { container?: string };
}
export const ObserveVisibility = ({
  children: Children,
  root,
  rootMargin,
  threshold,
  classes
}: ObserveVisibilityProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();
  const onIntersect = (entries, observer) => {
    entries.length && setIsVisible(entries[0].isIntersecting);
  };

  useEffect(() => {
    if (IntersectionObserver) {
      const observer = new IntersectionObserver(onIntersect, {
        root: root && root.current,
        rootMargin,
        threshold
      });

      containerRef.current && observer.observe(containerRef.current);
    }
  }, []);

  return IntersectionObserver ? (
    <div ref={containerRef} className={classNames(classes && classes.container)}>
      <Children isVisible={isVisible} />
    </div>
  ) : null;
};
ObserveVisibility.defaultProps = {
  threshold: 0.5
};

interface TrackInViewportProps {
  children: React.ReactElement;
  isVisible?: boolean;
  onVisible?: () => void;
}
export const TrackInViewport = ({ children, isVisible, onVisible }: TrackInViewportProps) => {
  const wasVisible = usePrevious(isVisible);
  useEffect(() => {
    if (wasVisible !== isVisible && isVisible) {
      onVisible?.();
    }
  }, [isVisible, wasVisible, onVisible]);

  return children;
};
