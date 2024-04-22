import { render } from '@testing-library/react';
import { renderHtmlContent, sanitizeAndPreprocessHtmlContent, autoDetectUrl } from '../html';

describe('renderHtmlContent', () => {
  const imageLink = 'https://example.com';

  describe(`when 'isLinkDetect' is off`, () => {
    test(`HTML is generated for 'imgLink' without 'a' tag`, () => {
      const { container } = render(renderHtmlContent({ content: imageLink }));

      ['</div>', imageLink].forEach((segment) => {
        expect(container.innerHTML).toContain(segment);
      });

      expect(container.innerHTML).not.toContain('</a>');
    });
  });

  describe(`when 'isLinkDetect' is on`, () => {
    test(`HTML is generated for 'imgLink' with 'a' tag`, () => {
      const { container } = render(
        renderHtmlContent({ content: imageLink, style: { color: 'green' }, isDetectLink: true })
      );

      ['</div>', '</a>', 'href'].forEach((segment) => {
        expect(container.innerHTML).toContain(segment);
      });

      expect(container.innerHTML.match(new RegExp(imageLink, 'g'))).toHaveLength(2);
    });
  });
});

describe('sanitizeAndPreprocessHtmlContent', () => {
  const imageLink = 'https://example.com';

  describe(`when 'isLinkDetect' is off`, () => {
    test(`HTML is generated for 'imgLink' without 'a' tag`, () => {
      const html = sanitizeAndPreprocessHtmlContent({ content: imageLink });

      expect(html).toContain(imageLink);
      expect(html).not.toContain('</a>');
    });
  });

  describe(`when 'isLinkDetect' is on`, () => {
    test(`HTML is generated for 'imgLink' with 'a' tag`, () => {
      const processed = sanitizeAndPreprocessHtmlContent({ content: imageLink, isDetectLink: true });

      ['</a>', 'href'].forEach((segment) => {
        expect(processed).toContain(segment);
      });
      expect(processed.match(new RegExp(imageLink, 'g'))).toHaveLength(2);
    });
  });
});

test('[Utils Function] Html link detection', () => {
  expect(autoDetectUrl('')).toBe('');
  expect(autoDetectUrl('abcdef')).toBe('abcdef');
  expect(autoDetectUrl('http://example.com')).toBe(
    ' <a target="" style="color: #1887db; font-size: inherit;" href="http://example.com">http://example.com</a> '
  );
  expect(autoDetectUrl('https://www.example.com', '_blank')).toBe(
    ' <a target="_blank" style="color: #1887db; font-size: inherit;" href="https://www.example.com">https://www.example.com</a> '
  );
});
