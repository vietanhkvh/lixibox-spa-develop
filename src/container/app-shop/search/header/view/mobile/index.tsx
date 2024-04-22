import { forwardRef } from 'react';
import classNames from 'classnames';
import { SearchSource } from 'constants/application/search';
import SvgIcon from 'presentation-component/ui/icon';
import { generateTestId } from 'utils/test-utils';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const View = forwardRef<HTMLInputElement, ViewProps>(
  ({ keyword, placeholder, classes, onClick, onChange, onSubmit, onReset, onRequestClose }, searchInputRef) => {
    return (
      <div className={classNames(styles.headerContainer, classes?.container)}>
        <SvgIcon name={'angle-left'} className={styles.backIcon} onClick={onRequestClose} />
        <div className={styles.searchboxContainer}>
          <SvgIcon {...{ name: 'search', className: styles.searchIcon }} />
          <input
            {...{
              autoComplete: 'off',
              value: keyword,
              name: 'search-input',
              className: styles.input,
              placeholder,
              ref: searchInputRef,
              onKeyUp: (e) => e.key === 'Enter' && onSubmit(SearchSource.ENTER),
              onChange: (e) => onChange(e.target.value),
              onClick: () => onClick?.(keyword),
              onFocus: (e) => {
                const length = e.target.value.length;
                e.target.setSelectionRange(length, length);
              }
            }}
            {...generateTestId({ name: 'search-bar' })}
          />
          {!!keyword?.length && <SvgIcon name="close" className={styles.closeIcon} onClick={onReset} />}
        </div>
      </div>
    );
  }
);

export default View;
