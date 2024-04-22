import AdLink from 'presentation-component/ui/ad-link';
import classNames from 'classnames';
import styles from './style.module.scss';

interface KeywordPillProps {
  keyword: string;
  link?: string;
  classes?: { container?: string };
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
const KeywordPill = ({ keyword, link, classes, onClick }: KeywordPillProps) => {
  return (
    <AdLink
      {...{
        className: classNames(styles.keywordPill, classes?.container),
        to: link || '#',
        onClick
      }}
    >
      <span>{keyword}</span>
    </AdLink>
  );
};

export default KeywordPill;
