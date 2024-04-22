import classnames from 'classnames';

import SubmitButton from '../../../components/ui/submit-button';
import SvgIcon from '../../../presentation-component/ui/icon';
import styles from './style.module.css';
import STYLE from './style';

export function SelectListItem(item, index) {
  return (
    <div
      onClick={() => {
        'function' === typeof this.onClick && this.onClick(item);
      }}
      className={classnames(
        styles.selectListItem,
        { [styles.column]: 'column' === this.type },
        { [styles.selected]: !!item.selected }
      )}
      key={item.id || index}
    >
      <span className={styles.itemTitle}>{item.title}</span>
      {item.count && <span>{`(${item.count})`}</span>}
    </div>
  );
}

export const SelectList = ({ list, type = 'row', onClick = () => {} }: any) => {
  if (!list || !list.length) return null;

  return (
    <div className={classnames(styles.selectList, { [styles.column]: 'column' === type })}>
      {list.map(SelectListItem, { type, onClick })}
    </div>
  );
};

export const Panel = ({ title, children, viewMore = '', onViewMoreClick = () => {} }) => {
  return (
    <div className={styles.panel}>
      {!!title && !!title.length && (
        <div className={styles.title}>
          {title}
          {!!viewMore.length && (
            <div className={styles.viewMoreTitle} onClick={onViewMoreClick}>
              {viewMore}
              <SvgIcon name={'angle-right'} className={styles.viewmoreIcon} />
            </div>
          )}
        </div>
      )}
      <div className={styles.panelContent}>{children}</div>
    </div>
  );
};

export const BottomAction = ({
  title,
  cancelTitle = '',
  isShowCancelButton = false,
  onSubmit,
  onCancel = () => {}
}) => {
  return (
    <div className={styles.bottomPanel}>
      {!!isShowCancelButton && (
        <SubmitButton title={cancelTitle} onSubmit={onCancel} style={STYLE.bottomButton} color={'borderGrey'} />
      )}
      <SubmitButton title={title} onSubmit={onSubmit} style={STYLE.bottomButton} color={'grey'} />
    </div>
  );
};
