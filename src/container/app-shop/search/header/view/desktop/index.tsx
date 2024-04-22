import { forwardRef } from 'react';
import classNames from 'classnames';
import { SearchSource } from 'constants/application/search';
import SvgIcon from 'presentation-component/ui/icon';
import { generateTestId } from 'utils/test-utils';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const View = forwardRef<HTMLInputElement, ViewProps>(
  ({ keyword, placeholder, classes, isOpen, onClick, onChange, onSubmit, onReset }, searchInputRef) => {
    return (
      <div className={classNames(styles.headerContainer, classes?.container)}>
        <div className={classNames(styles.searchboxContainer, isOpen && styles.open)}>
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
          <div
            {...{
              className: styles.searchIconContainer,
              onClick: () => onSubmit(SearchSource.SEARCH_ICON)
            }}
            {...generateTestId({ name: 'btn-search' })}
          >
            <SvgIcon name="search" className={styles.searchIcon} />
          </div>
        </div>
      </div>
    );
  }
);

export default View;
