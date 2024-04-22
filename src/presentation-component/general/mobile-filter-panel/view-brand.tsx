import InputField from '../../../components/ui/input-field';
import SvgIcon from '../../ui/icon';

import { Panel, SelectList } from './view-general';
import styles from './style.module.css';
import STYLE from './style';

export const SearchBrand = ({ onChange }) => {
  const inputProps = {
    title: '',
    type: InputField.INPUT_TYPE.TEXT,
    name: InputField.INPUT_NAME.NAME,
    isRoundedStyle: true,
    placeholder: 'Tìm kiếm',
    style: STYLE.input,
    inputStyle: STYLE.searchInput,
    onChange
  };

  const iconProps = {
    name: 'search',
    className: styles.searchBrandIcon
  };

  return (
    <div className={styles.searchBrand}>
      <InputField {...inputProps} />
      <SvgIcon {...iconProps} />
    </div>
  );
};

export const Brand = ({
  onSearchBrand,
  brandList,
  brandsLength,
  onSelectBrand,
  stepState = 'full',
  onViewMoreClick
}) => {
  if ('full' === stepState) {
    brandList = brandList.filter((_, index) => index < 10);
  }
  const searchBrandProps = {
    onChange: ({ value }) => onSearchBrand(value)
  };
  return (
    <Panel
      title={'full' === stepState ? 'Thương hiệu' : ''}
      viewMore={brandList.length > 8 ? `Tất cả (${brandsLength})` : ''}
      onViewMoreClick={onViewMoreClick}
    >
      {'full' !== stepState && <SearchBrand {...searchBrandProps} />}
      <SelectList list={brandList} type={'column'} onClick={onSelectBrand} />
    </Panel>
  );
};
