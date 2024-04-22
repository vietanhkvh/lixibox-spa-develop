import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface KeywordRowProps {
  keyword: string | React.ReactNode;
  keywordGroup?: string;
  link?: string;
  classes?: { container?: string };
  onRowClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onAutoCompleteClick?: () => void;
}
const KeywordRow = ({ keyword, keywordGroup, link, classes, onRowClick, onAutoCompleteClick }: KeywordRowProps) => {
  return (
    <NavLink
      {...{
        className: classNames(styles.keywordRow, classes?.container),
        to: link || '#',
        onClick: onRowClick
      }}
    >
      <span className={styles.keyword}>{keyword}</span>
      {!!keywordGroup && <span className={styles.keywordGroup}>- {keywordGroup}</span>}
      <Icon
        {...{
          name: 'arrow-paste',
          className: styles.arrowPasteIcon,
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            onAutoCompleteClick?.();
          }
        }}
      />
    </NavLink>
  );
};

export default KeywordRow;
