import AdLink from '../../../presentation-component/ui/ad-link';
import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const renderDesktop = (props: IProps) => {
  const { list = [], style } = props;

  return (
    <div style={Object.assign({}, STYLE.container, style)}>
      {Array.isArray(list) &&
        list.map((item, index) => (
          <AdLink
            {...{
              key: `item-${index}`,
              to: item.link,
              style: STYLE.item
            }}
          >
            <div key={`item-${index}`} style={STYLE.item.inner}>
              <span key={`title-item-${index}`} className={styles.itemTitle}>
                {item.title}
              </span>
            </div>
          </AdLink>
        ))}
    </div>
  );
};

export default renderDesktop;
