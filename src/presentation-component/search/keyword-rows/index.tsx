import classNames from 'classnames';
import KeywordRow from '../keyword-row';
import SectionHeader from '../section-header';
import styles from './style.module.scss';

interface KeywordRowsProps<KeywordType> {
  keywords: KeywordType[];
  rowContentTemplate?: (keyword: string) => React.ReactNode;
  title?: { label: string; viewMoreLink?: { link: string; title: string } };
  /**
   * ID for tracing the origin of the click. Passed to the onRowClick and onAutoCompleteClick callbacks.
   */
  id?: string;
  getLink?: (keyword: KeywordType) => string;
  getLabel?: (keyword: KeywordType) => string;
  getGroup?: (keyword: KeywordType) => string;
  onRowClick?: (params: {
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    keyword: KeywordType;
    link?: string;
    id?: string;
  }) => void;
  onAutoCompleteClick?: (keyword: KeywordType, originId?: string) => void;
  classes?: { container?: string; title?: string; rows?: string; item?: string };
}
const KeywordRows: React.FC<KeywordRowsProps<any>> = ({
  keywords,
  rowContentTemplate,
  title,
  id,
  classes,
  getLink,
  getLabel,
  getGroup,
  onRowClick,
  onAutoCompleteClick
}) => {
  return (
    <div className={classNames(styles.keywordRows, classes?.container)}>
      {!!title && (
        <SectionHeader
          title={title?.label}
          classes={{ container: classNames(styles.header, classes?.title) }}
          viewMoreLink={title?.viewMoreLink}
        />
      )}
      <div className={classNames(styles.rows, classes?.rows)}>
        {keywords.map((keyword, index) => (
          <KeywordRow
            {...{
              key: index,
              keyword:
                typeof keyword === 'string'
                  ? rowContentTemplate?.(keyword) || keyword
                  : (getLabel?.(keyword) && rowContentTemplate?.(getLabel?.(keyword))) || getLabel?.(keyword) || '',
              keywordGroup: typeof keyword === 'string' ? '' : getGroup?.(keyword),
              link: getLink?.(keyword),
              classes: { container: classNames(styles.row, classes?.item) },
              onRowClick: (e) => onRowClick?.({ e, keyword, id, link: getLink?.(keyword) }),
              onAutoCompleteClick: () => onAutoCompleteClick?.(keyword, id)
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default KeywordRows;
