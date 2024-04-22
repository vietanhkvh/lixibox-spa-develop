import classNames from 'classnames';

import SvgIcon from '../../../../../presentation-component/ui/icon';
import { ViewProps } from '../..';
import style from './style.module.scss';

const SearchHeader = ({
  value,
  placeholder,
  isAddressSelected,
  onChange,
  onLocationSelect,
  onReset,
  classes
}: ViewProps) => {
  const isFilterPresent = isAddressSelected || !!value;

  return (
    <div className={classNames(style.searchHeader, classes?.container)}>
      <div className={style.locationIconContainer} onClick={() => onLocationSelect?.()}>
        <SvgIcon
          name={'mark-location'}
          className={classNames(style.locationIcon, isAddressSelected && style.locationIconActive)}
        />
      </div>
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={style.searchInput}
      />
      {isFilterPresent && (
        <div onClick={() => onReset?.()} className={style.clearIconContainer}>
          <SvgIcon name={'close'} className={style.clearIcon} />
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
