import { initFacebookComment } from '../facebook-comments';

const fbParseMock = jest.fn();
Object.defineProperty(window, 'FB', { value: { XFBML: { parse: fbParseMock } }, writable: true, configurable: true });

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('initFacebookComment', () => {
  describe(`when '#fb-comments-panel' is not found`, () => {
    test(`NOP`, () => {
      initFacebookComment('0');
      jest.runAllTimers();
      expect(document.body.innerHTML).toEqual('');
      expect(document.getElementsByTagName('script').length).toEqual(0);
    });
  });

  describe(`when '#fb-comments-panel' is a valid reference`, () => {
    describe(`when 'document' contains no 'script' tag with 'id="facebook-comment"'`, () => {
      test(`initiates Facebook comment panel`, () => {
        document.head.innerHTML = `<script></script>`;
        document.body.innerHTML = `<div id="fb-comments-panel">Initial text</div>`;
        initFacebookComment('0');
        jest.runAllTimers();
        const commentPanel = document.getElementById('fb-comments-panel');
        expect(commentPanel).not.toBeNull();
        if (commentPanel) {
          expect(commentPanel.innerHTML).not.toContain('Initial text');
          expect(commentPanel.innerHTML).toContain(`class="fb-comments"`);
        }
        expect(document.getElementById('facebook-comment')).not.toBeNull();
        expect(fbParseMock).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when 'document' contains a 'script' tag with 'id="facebook-comment"`, () => {
      test(`initiates Facebook comment panel`, () => {
        document.head.innerHTML = `<script id="facebook-comment"></script>`;
        initFacebookComment('0');
        jest.runAllTimers();
        expect(document.getElementById('facebook-comment')).not.toBeNull();
      });
    });
  });
});
