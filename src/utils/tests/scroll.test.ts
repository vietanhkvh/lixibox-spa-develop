import { scrollElement } from '../scroll';

describe('scrollElement', () => {
  describe('animated scrolling', () => {
    beforeEach(() => {
      window.scrollTo = jest.fn();
      scrollElement({ x: 10, y: 20, isAnimation: true });
    });

    afterEach(() => {
      window.scrollTo = () => {};
    });

    test('should invoke scrollTo with "smooth" property', () => {
      expect(window.scrollTo).toHaveBeenCalledTimes(1);
      expect(window.scrollTo).toHaveBeenCalledWith({ left: 10, top: 20, behavior: 'smooth' });
    });
  });

  describe('non animated scrolling', () => {
    beforeEach(() => {
      window.document.body.scrollTo = jest.fn();
      scrollElement({ x: 30, y: 40, element: window.document.body });
    });

    afterEach(() => {
      window.document.body.scrollTo = () => {};
    });

    test('should invoke scrollTo without "smooth" property', () => {
      expect(window.document.body.scrollTo).toHaveBeenCalledTimes(1);
      expect(window.document.body.scrollTo).toHaveBeenCalledWith(30, 40);
    });
  });
});
