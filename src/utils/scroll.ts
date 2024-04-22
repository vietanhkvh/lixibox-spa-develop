import { shouldDisplayOnPath } from './messenger';

export const enableDocumentScroll = () => {
  try {
    const shopAppElement: any = document.getElementById('shop-app');

    if (!!shopAppElement) {
      const scrollYPages = Math.abs(parseInt(shopAppElement.style.top));
      shopAppElement.setAttribute('style', '');
      !!scrollYPages && scrollElement({ x: 0, y: scrollYPages });
    }

    /** Show facebook customer chat when close modal */
    const fbRootElement: any = document.getElementById('fb-root');
    if (shouldDisplayOnPath(window.location.pathname) && !!fbRootElement) fbRootElement.style.display = 'block';
  } catch (e) {}
};

export const disableDocumentScroll = () => {
  try {
    const shopAppElement: any = document.getElementById('shop-app');
    const isFixScroll = !!shopAppElement && 'fixed' !== shopAppElement.style.position;

    if (isFixScroll) {
      const scrollYPages = window.scrollY;
      shopAppElement.style.top = `-${scrollYPages}px`;
      shopAppElement.style.width = '100%';
      shopAppElement.style.position = 'fixed';
    }

    /** Force hide facebook customer chat when open modal */
    const fbRootElement: any = document.getElementById('fb-root');
    if (!!fbRootElement) fbRootElement.style.display = 'none';
  } catch (e) {}
};

interface IScrollElement {
  x: number;
  y: number;
  element?: Window | any;
  isAnimation?: Boolean;
}

export function scrollElement({ x, y, element = window, isAnimation = false }: IScrollElement) {
  if (!!isAnimation) {
    element.scrollTo({
      left: x,
      top: y,
      behavior: 'smooth'
    });
  } else {
    element.scrollTo(x, y);
  }
}

// Get current scroll percentage of the target element
// target element's position is calculated from the bottom of the screen
export const getCurrentScrollPercentage = ({ targetElement, targetOffset }) => {
  if (!targetElement) {
    return 0;
  }
  const documentElement = document.documentElement;
  const clientHeight = documentElement.clientHeight;
  const scrollHeight = targetElement.scrollHeight;

  const currentScrollPosition = documentElement.scrollTop + clientHeight - targetOffset;
  let currentScrollPercentage = (currentScrollPosition / scrollHeight) * 100;
  // max 100%
  currentScrollPercentage = currentScrollPercentage > 100 ? 100 : currentScrollPercentage;
  // round
  currentScrollPercentage = Math.round(currentScrollPercentage * 100) / 100;

  return currentScrollPercentage;
};

export const enableHorizontalScrollThroughMouseFor = (selector) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });

    element.addEventListener('mouseleave', () => {
      isDown = false;
    });

    element.addEventListener('mouseup', () => {
      isDown = false;
    });

    element.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = x - startX;
      element.scrollLeft = scrollLeft - walk;
    });
  });
};
