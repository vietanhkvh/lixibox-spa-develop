import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';
import { usePrevious } from 'utils/hook';
import { hexToRGBA } from 'utils/format';
import * as VARIABLE from 'style/variable';
import styles from './style.module.scss';

const SHOW_MORE_TEXT = 'Xem thêm';

interface ShowMoreInlineProps {
  text: string;
  lineCount: number;
  lineHeight: number;
  onClick?: () => void;
  classes?: { container?: string; button?: string };
  backgroundColorHex?: string;
}
const ShowMoreInline = ({ text, lineCount, lineHeight, onClick, classes, backgroundColorHex }: ShowMoreInlineProps) => {
  const _backgroundColorHex = backgroundColorHex || VARIABLE.colorWhite; // Fallback for invalid color
  const containerRef = useRef<HTMLDivElement>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollHeight = containerRef.current?.scrollHeight || 0;
  const prevScrollHeight = usePrevious(scrollHeight);
  useEffect(() => {
    if (scrollHeight && !prevScrollHeight && scrollHeight > lineHeight * (lineCount + 1)) {
      setIsCollapsed(true);
    }
  }, [text, scrollHeight, lineHeight, lineCount]);

  return (
    <div className={classNames(styles.showMoreInline, classes?.container)} onClick={() => onClick?.()}>
      <SanitizedAndPreprocessedHTMLContent
        content={text}
        isSantitizeHtml={false}
        formatRNAsLineBreak
        className={classNames(
          styles.displayableContent,
          (prevScrollHeight === undefined || isCollapsed) && styles.contentCollapsed
        )}
        style={{ WebkitLineClamp: lineCount }}
        ref={containerRef}
      />
      {isCollapsed && (
        <span
          className={classNames(styles.button, classes?.button)}
          style={{
            background: `linear-gradient(
              90deg,
              ${hexToRGBA(_backgroundColorHex, 0)} 0%,
              ${_backgroundColorHex} 30%,
              ${_backgroundColorHex} 100%
            )`
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(false);
          }}
        >
          {SHOW_MORE_TEXT}
        </span>
      )}
    </div>
  );
};
ShowMoreInline.defaultProps = {
  backgroundColorHex: VARIABLE.colorWhite
};

export type { ShowMoreInlineProps };
export default ShowMoreInline;
