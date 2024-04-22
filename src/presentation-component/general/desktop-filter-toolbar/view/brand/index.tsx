import classnames from 'classnames';

import { changeAlias } from '../../../../../utils/format';
import InputField from '../../../../../components/ui/input-field';
import SubmitButton from '../../../../../components/ui/submit-button';
import SvgIcon from '../../../../ui/icon';
import styles from './style.module.scss';
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
    onChange: ({ value }) => onChange(value)
  };

  const iconProps = {
    name: 'search',
    className: styles.searchBrandIcon
  };

  return (
    <div className={styles.searchBrand}>
      <SvgIcon {...iconProps} />
      <InputField {...inputProps} />
    </div>
  );
};

export const SelectList = ({
  selectedBrand,
  list,
  type = 'row',
  onClick = () => {},
  onSubmit = (_) => {},
  onReset = () => {}
}) => {
  if (!list || !list.length) return null;

  const submitButtonProps = {
    title: 'Áp dụng',
    color: 'black',
    style: { margin: '0 16px 0 0' },
    onSubmit: () => onSubmit({ brands: selectedBrand.join(',') })
  };

  const resetButtonProps = {
    title: 'Bỏ chọn',
    color: 'white',
    style: { margin: 0 },
    onSubmit: onReset
  };

  return (
    <div className={classnames(styles.selectList, { [styles.column]: 'column' === type })}>
      <div className={styles.list}>
        {list.map(SelectListItem, { type, onClick })}
        {``}
      </div>
      <div className={styles.action}>
        <SubmitButton {...submitButtonProps} />
        <SubmitButton {...resetButtonProps} />
      </div>
    </div>
  );
};

export function SelectListItem(item, index) {
  const checkIconProps = {
    name: !!item.selected ? 'checkbox-checked' : 'checkbox-empty',
    className: styles.icon
  };

  return (
    <div
      onClick={() => {
        'function' === typeof this.onClick && this.onClick(item);
      }}
      className={styles.selectListItem}
      key={item.id || index}
    >
      <SvgIcon {...checkIconProps} />
      <span className={styles.title}>{item.title}</span>
      {item.count && <span className={styles.count}>{`(${item.count})`}</span>}
    </div>
  );
}

export const BrandPanel = ({
  brandList,
  isOpenBrand,
  onClickOverlay,
  onSelectBrand,
  searchBrandValue,
  selectedBrand,
  onSearchBrand,
  onSubmit,
  onReset
}) => {
  if (!brandList.length) return null;

  const combinedBrandList = brandList
    .filter((item, index) => {
      if (!searchBrandValue && !searchBrandValue.length) return true;

      return changeAlias(item.brand_name).indexOf(changeAlias(searchBrandValue)) >= 0;
    })
    .map((item) => ({
      id: item.brand_id,
      title: item.brand_name,
      selected: selectedBrand.indexOf(item.brand_slug) >= 0,
      count: item.count,
      slug: item.brand_slug
    }));

  return (
    <div className={classnames(styles.brandPanel, { [styles.isOpen]: !!isOpenBrand })}>
      <div className={styles.overlay} onClick={onClickOverlay} />
      <div className={styles.brandList}>
        <SearchBrand onChange={onSearchBrand} />
        <SelectList
          selectedBrand={selectedBrand}
          list={combinedBrandList}
          type={'column'}
          onClick={onSelectBrand}
          onSubmit={onSubmit}
          onReset={onReset}
        />
      </div>
    </div>
  );
};
