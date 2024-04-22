import classNames from 'classnames';

import { CDN_ASSETS_PREFIX } from '../../../../../utils/uri';
import SvgIcon from '../../../../../presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import { ViewProps } from '../..';
import style from './style.module.scss';

const referralBackground1 = CDN_ASSETS_PREFIX('/info/cover.png');

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
      <Image src={referralBackground1} alt="" className={style.headerBackground} />
      <div className={style.headerOverlay} />
      <div className={style.headerContent}>
        <div className={style.title1}>Danh sách cửa hàng</div>
        <div className={style.searchBox}>
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
              <SvgIcon name={'close'} className={style.icon} />
            </div>
          )}
          <div className={style.searchIconContainer}>
            <SvgIcon name={'search'} className={style.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
