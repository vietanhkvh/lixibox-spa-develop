import { NavLink } from 'react-router-dom';

import * as LAYOUT from '../../../../style/layout';
import Icon from '../../../../components/ui/icon';
import SvgIcon from '../../../../presentation-component/ui/icon';
import { isMobileVersion } from '../../../../utils/responsive';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';

import { IState } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const infoStyle = STYLE.infoContainer.infoGroup;

const renderText = ({ style, text, className = '' }) => {
  return (
    <div className={className} style={style}>
      {text}
    </div>
  );
};

const renderInfoIcon = (iconName) => {
  const iconProps = {
    name: iconName,
    className: styles.itemGroupIcon
  };

  return <SvgIcon {...iconProps} />;
};

const renderInfoGroup = ({ item, index, length, link, target }) => {
  const linkProps = {
    key: `info-content-${index}`,
    to: link,
    target,
    style: infoStyle.info.container(length - 1 === index)
  };

  return (
    <NavLink {...linkProps}>
      {renderInfoIcon(item.iconName)}
      {renderText({ style: infoStyle.info.txtTitle, text: item.txtTitle, className: styles.limitedLine })}
      {renderText({ style: infoStyle.info.txt, text: item.txt, className: styles.limitedLine })}
    </NavLink>
  );
};

const renderView = ({ props, state, handleSearchOnChange }) => {
  const {
    appStore: { mobileappWebviewStatus }
  } = props;
  const { infoList, searchKeyWord, searchList } = state as IState;

  const textProps = {
    style: STYLE.searchWrap.search.input,
    autoComplete: 'off',
    placeholder: 'Tìm kiếm thông tin về Lixibox...',
    value: searchKeyWord,
    onChange: (e) => handleSearchOnChange(e)
  };

  const iconSearchProps = {
    name: 'search',
    style: STYLE.searchWrap.search.button,
    innerStyle: STYLE.searchWrap.search.inner
  };

  return (
    <div className={'info-container'}>
      {!mobileappWebviewStatus && !!isMobileVersion() && (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={'Thông tin về Lixibox'} />
        </MobileAutoDisplayHeader>
      )}
      <div style={STYLE.searchWrap.container}>
        <div style={STYLE.searchWrap.overlay} />
        <div style={STYLE.searchWrap.heading}>Xin chào, Lixibox giúp gì được cho bạn?</div>
        {!isMobileVersion() &&
          renderText({
            style: STYLE.searchWrap.textInfo,
            text: 'Thông tin về Lixibox, Hướng dẫn mua hàng'
          })}
        <div style={Object.assign({}, LAYOUT.flexContainer.justify, STYLE.searchWrap.search.container)}>
          <input {...textProps} />
          <Icon {...iconSearchProps} />
          {searchList && searchList.length !== 0 ? (
            <div
              className={styles.searchWrapSearchSuggestionSearch}
              style={Object.assign({}, STYLE.searchWrap.search.showSuggestionSearch)}
            >
              {Array.isArray(searchList) &&
                searchList.map((item, index) => {
                  const linkProps = {
                    key: `search-key-${index}`,
                    style: STYLE.searchWrap.search.suggestionSearch.text,
                    to: item.link
                  };

                  return <NavLink {...linkProps}>{item.title}</NavLink>;
                })}
            </div>
          ) : null}
        </div>
      </div>
      <div style={STYLE.infoContainer}>
        <div style={infoStyle.container}>
          {Array.isArray(infoList) &&
            infoList.map((item, index) =>
              renderInfoGroup({
                item,
                index,
                length: infoList.length,
                link: item.link,
                target: item.target
              })
            )}
          {isMobileVersion() && (
            <div className={styles.companyInfo}>
              {renderInfoIcon('mark-location')}
              <p className={styles.bolded}>Công ty TNHH One Click</p>
              <p>Địa chỉ: 16 Đường Số 34, Khu Phố 2, Phường An Khánh, Thành phố Thủ Đức, Hồ Chí Minh</p>
              <p> Mã số thuế: 0317581963</p>
              <p> Số điện thoại liên hệ: 028.36366787</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default renderView;
