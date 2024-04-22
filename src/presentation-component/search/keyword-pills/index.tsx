import classNames from 'classnames';
import SectionHeader from '../section-header';
import KeywordPill from '../keyword-pill';
import styles from './style.module.scss';

// TODO: Fix typing
interface KeywordPillsProps<KeywordType> {
  keywords: KeywordType[];
  /**
   * ID for tracing the origin of the click. Passed to the onClick callback.
   */
  id?: string;
  getLink?: (keyword: KeywordType) => string;
  getLabel?: (keyword: KeywordType) => string;
  title?: { label: string; viewMoreLink?: { link: string; title: string } };
  onClick?: (params: {
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    keyword: KeywordType;
    link?: string;
    id?: string;
  }) => void;
  classes?: { container?: string; title?: string; pills?: string; item?: string };
}
const KeywordPills: React.FC<KeywordPillsProps<any>> = ({
  keywords,
  title,
  id,
  classes,
  getLink,
  getLabel,
  onClick
}) => {
  return (
    <div className={classNames(styles.keywordPills, classes?.container)}>
      {!!title && (
        <SectionHeader
          title={title?.label}
          classes={{ container: classNames(styles.header, classes?.title) }}
          viewMoreLink={title?.viewMoreLink}
        />
      )}
      <div className={classNames(styles.pills, classes?.pills)}>
        {keywords.map((keyword, index) => (
          <KeywordPill
            {...{
              key: index,
              keyword: typeof keyword === 'string' ? keyword : getLabel?.(keyword) || '',
              link: getLink?.(keyword),
              classes: { container: classes?.item },
              onClick: (e) => onClick?.({ e, keyword, id, link: getLink?.(keyword) })
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default KeywordPills;
