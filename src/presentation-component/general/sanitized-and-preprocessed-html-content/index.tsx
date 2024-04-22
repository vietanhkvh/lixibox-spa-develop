import { useMemo, forwardRef, RefObject } from 'react';
import classNames from 'classnames';
import { sanitizeAndPreprocessHtmlContent, htmlUtilsBugTracking } from '../../../utils/html';
import styles from './style.module.scss';

interface SanitizedAndPreprocessedHTMLContentProps {
  content?: string;
  className?: string;
  style?: { [key: string]: string | number };
  isDetectLink?: boolean;
  detectLinkTarget?: string;
  isReplaceVideoEmbed?: boolean;
  isSantitizeHtml?: boolean;
  formatRNAsLineBreak?: boolean; // Treats `\r\n` and `\n` as line break
  onError?: (e: Error) => any;
}
/**
 * @param {Object} style - Should not be used. Retained for backward compatibility only
 */
const SanitizedAndPreprocessedHTMLContent = forwardRef(
  (
    {
      content,
      className,
      style,
      isDetectLink,
      detectLinkTarget,
      isReplaceVideoEmbed,
      isSantitizeHtml,
      formatRNAsLineBreak,
      onError
    }: SanitizedAndPreprocessedHTMLContentProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    const processedContent = useMemo<string>(() => {
      const _onError = (e: Error) => {
        htmlUtilsBugTracking(e, 'SanitizedAndPreprocessedHTMLContent');
        onError && onError(e);
      };
      return sanitizeAndPreprocessHtmlContent({
        content,
        isDetectLink,
        detectLinkTarget,
        isReplaceVideoEmbed,
        isSantitizeHtml,
        onError: _onError
      });
    }, [content, isSantitizeHtml, isDetectLink, isReplaceVideoEmbed, detectLinkTarget, onError]);

    return (
      <div
        className={classNames(
          styles.sanitizedAndPreprocessedHtmlContent,
          formatRNAsLineBreak && styles.formatRN,
          className
        )}
        style={style}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  }
);
SanitizedAndPreprocessedHTMLContent.defaultProps = {
  content: '',
  className: '',
  style: {},
  isDetectLink: false,
  detectLinkTarget: '',
  isReplaceVideoEmbed: false,
  isSantitizeHtml: true,
  formatRNAsLineBreak: false
};

export default SanitizedAndPreprocessedHTMLContent;
