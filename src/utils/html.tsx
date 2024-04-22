import DOMPurify from 'dompurify';
import SanitizedAndPreprocessedHTMLContent from '../presentation-component/general/sanitized-and-preprocessed-html-content';
import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../tracking/google-analytic/type';
import { gaEventTracking } from '../tracking/google-analytic/ga-event-tracking';

export const htmlUtilsBugTracking = (error: Error, info: string) => {
  gaEventTracking({
    category: GA_TRACKING_EVENT_CATEGORY.EXCEPTION,
    action: GA_TRACKING_EVENT_ACTION.EXCEPTION.GENERAL,
    label: `${GA_TRACKING_EVENT_LABEL.EXCEPTION.GENERAL} HTML Uils - ${info}`,
    value: 1
  });
};
export interface sanitizeAndPreprocessHtmlContentParams {
  content?: string;
  className?: string;
  isDetectLink?: boolean;
  detectLinkTarget?: string;
  isReplaceVideoEmbed?: boolean;
  isSantitizeHtml?: boolean;
  onError?: (e: Error) => any;
}
export const sanitizeAndPreprocessHtmlContent = ({
  content,
  isDetectLink,
  detectLinkTarget,
  isReplaceVideoEmbed,
  isSantitizeHtml,
  onError
}: sanitizeAndPreprocessHtmlContentParams): string => {
  let processedContent = '';
  try {
    processedContent = content;

    if (!!isSantitizeHtml) processedContent = santitizeHtml(processedContent);
    if (!!isDetectLink) processedContent = autoDetectUrl(processedContent, detectLinkTarget);
    if (!!isReplaceVideoEmbed) processedContent = autoReplaceVideoEmbed(processedContent);
    return processedContent;
  } catch (e) {
    onError && onError(e);
    return processedContent;
  }
};

/**
 * NOTE: Retained for backward compatibility
 * TODO: Remove
 *
 * @deprecated Use `SanitizedAndPreprocessedHTMLContent` from `presentation-component/general/sanitized-and-preprocessed-html-content`
 */
export const renderHtmlContent = ({
  content = '',
  style = {},
  isDetectLink = false,
  detectLinkTarget = '',
  isReplaceVideoEmbed = false,
  isSantitizeHtml = true,
  formatRNAsLineBreak = false
}) => (
  <SanitizedAndPreprocessedHTMLContent
    {...{
      content,
      style,
      isDetectLink,
      detectLinkTarget,
      isReplaceVideoEmbed,
      isSantitizeHtml,
      formatRNAsLineBreak,
      onError(e) {
        htmlUtilsBugTracking(e, 'renderHtmlContent');
      }
    }}
  />
);

const santitizeHtml = (content: string): string => {
  const formatedContent = DOMPurify.sanitize(content);

  if (content.length !== formatedContent.length) {
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.EXCEPTION,
      action: GA_TRACKING_EVENT_ACTION.EXCEPTION.XSS_RISK,
      label: `${GA_TRACKING_EVENT_LABEL.EXCEPTION.XSS_RISK} ${window.location.href}: ${content}`,
      value: 1
    });
  }

  return formatedContent;
};

export const autoDetectUrl = (content, detectLinkTarget = '') => {
  try {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    const style = 'color: #1887db; font-size: inherit;';

    return content.replace(urlRegex, function (url) {
      if (url.indexOf('png') >= 0 || url.indexOf('jpg') >= 0 || url.indexOf('jpeg') >= 0 || url.indexOf('gif') >= 0)
        return 'url';

      return ` <a target="${detectLinkTarget}" style="${style}" href="${url}">${url}</a> `;
    });
  } catch (e) {
    htmlUtilsBugTracking(e, 'autoDetectUrl');
    return '';
  }
};

export const autoReplaceVideoEmbed = (content) => {
  try {
    var contentRegex = /(<iframe )(.*)(iframe>)/g;

    return content.replace(contentRegex, function (iframe) {
      const width = getAttribute(iframe, 'width');
      const height = getAttribute(iframe, 'height');
      const style = `padding-top: ${(height / width) * 100}%`;

      return ` <div class="video-iframe-wrap" style="${style}"> ${iframe} </div> `;
    });
  } catch (e) {
    htmlUtilsBugTracking(e, 'autoReplaceVideoEmbed');
    return '';
  }
};

export const getAttribute = (content, attribute) => {
  try {
    let contentRegex: any;

    if ('width' === attribute) contentRegex = /(width=")(\d*)(")/g;
    if ('height' === attribute) contentRegex = /(height=")(\d*)(")/g;

    const value = content.match(contentRegex);

    if (!value || (value && !value.length)) return 0;
    const split = value[0].split('"');
    const number = parseInt(split[1]);

    return !isNaN(number) ? number : 0;
  } catch (e) {
    htmlUtilsBugTracking(e, 'getAttribute');
    return 0;
  }
};
