import Icon from '../../ui/icon';
import * as LAYOUT from '../../../style/layout';
import STYLE from './style';
import styles from './style.module.scss';

const renderSearchBox = ({ handleSearchOnChange, handleSearchOnKeyUp }) => {
  const inputProps = {
    onChange: (e) => handleSearchOnChange(e),
    onKeyUp: (e) => handleSearchOnKeyUp(e),
    autoComplete: 'off',
    placeholder: 'Nhập từ khoá tìm kiếm...',
    style: STYLE.search.input,
    type: 'text'
  };

  const iconSearchProps = {
    name: 'search',
    className: styles.searchButton,
    innerStyle: STYLE.search.button.inner
  };

  return (
    <div style={Object.assign({}, LAYOUT.flexContainer.justify, STYLE.search)}>
      <div style={STYLE.search.groupSeachImput}>
        <input {...inputProps} />
        <Icon {...iconSearchProps} />
      </div>
    </div>
  );
};

export default renderSearchBox;
