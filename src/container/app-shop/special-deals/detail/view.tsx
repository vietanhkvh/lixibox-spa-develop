import Image from 'presentation-component/ui/image';
import WrapLayout from '../../../layout/wrap';
import Icon from '../../../../components/ui/icon';
import AdLink from '../../../../presentation-component/ui/ad-link';
import { objectToHash } from '../../../../utils/encode';
import { getDeviceVersion } from '../../../../utils/responsive';
import { ROUTING_SPECIAL_DEALS } from '../../../../routings/path';
import { isUndefined, checkLinkValid, autoCorrectLink } from '../../../../utils/validate';
import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../../constants/application/default';

import { IProps } from './model';
import STYLE from './style';

const handleRenderCategory = (item) => {
  const navLinkProps = {
    to: `${ROUTING_SPECIAL_DEALS}/${(item && item.slug) || ''}`,
    key: `special-deal-item-${(item && item.id) || ''}`,
    style: STYLE.categoryList.category
  };

  return <AdLink {...navLinkProps}>{(item && item.title) || ''}</AdLink>;
};

const renderCategoryList = ({ categories }) => {
  const containerProps = {
    style: Object.assign({}, STYLE.categoryList, STYLE.isShowing)
  };
  return <div {...containerProps}>{Array.isArray(categories) && categories.map(handleRenderCategory)}</div>;
};

const renderHeader = ({ title, handleClick, categories, isSubCategoryOnTop = false, showSubCategory = false }) => {
  const headerStyle = STYLE.headerMenuContainer;

  const menuIconProps = {
    name: 'angle-down',
    innerStyle: headerStyle.headerMenu.inner,
    style: headerStyle.headerMenu.icon(showSubCategory)
  };

  const headerMenuProps = {
    style: Object.assign({}, headerStyle.headerMenu, isSubCategoryOnTop && headerStyle.headerMenu.isTop),
    id: 'special-deals-menu'
  };

  const headerWrapProps = {
    style: headerStyle.headerMenuWrap,
    onClick: handleClick
  };

  return (
    <div style={headerStyle}>
      <div {...headerMenuProps}>
        <div {...headerWrapProps}>
          <div style={headerStyle.headerMenuWrapBlur} />
          <div style={headerStyle.headerMenu.textBreadCrumb}>{title}</div>
          <Icon {...menuIconProps} />
        </div>
        {showSubCategory && renderCategoryList({ categories })}
      </div>
    </div>
  );
};

function handleRenderContent(item) {
  const imgProps = {
    alt: '',
    key: `main-img-${item.id}`,
    src: (item && item.cover_image && item.cover_image.original_url) || [],
    style: STYLE.img
  };

  return checkLinkValid(item.links[0]) ? (
    <a href={autoCorrectLink(item.links[0])} style={this.style}>
      <Image {...imgProps} />
    </a>
  ) : (
    <div style={this.style}>
      <Image {...imgProps} />
    </div>
  );
}

const renderContent = ({ specialBannerList, specialSmallList, specialSmallTwoList, specialLargeTwoList }) => {
  return (
    <div style={STYLE.container}>
      <div>
        {Array.isArray(specialBannerList) && specialBannerList.map(handleRenderContent, { style: STYLE.mainImg })}
      </div>
      {specialSmallList && Array.isArray(specialSmallList) && specialSmallList.length > 0 && (
        <div style={STYLE.specialSmallList}>
          {specialSmallList.map(handleRenderContent, {
            style: STYLE.smallImg
          })}
        </div>
      )}
      {specialLargeTwoList && Array.isArray(specialLargeTwoList) && specialLargeTwoList.length > 0 && (
        <div style={STYLE.specialLargeTwoList}>
          {specialLargeTwoList.map(handleRenderContent, {
            style: STYLE.mainImg
          })}
        </div>
      )}
      {specialSmallTwoList && Array.isArray(specialSmallTwoList) && specialSmallTwoList.length > 0 && (
        <div style={STYLE.specialSmallList}>
          {specialSmallTwoList.map(handleRenderContent, {
            style: STYLE.smallImg
          })}
        </div>
      )}
    </div>
  );
};

const renderView = ({ state, props, handleShowSubCategory, getBannerIdByUrl }) => {
  const {
    bannerStore: { bannerList },
    specialDealStore: { specialDealList }
  } = props as IProps;

  const { showSubCategory, isSubCategoryOnTop } = state;

  let title: string = '';
  if (specialDealList.length > 0) {
    if (isUndefined('weekly-specials')) {
      title = specialDealList[0].title;
    } else {
      const deals = specialDealList.filter((item) => item.slug === 'weekly-specials');
      if (deals[0]) title = deals[0].title;
    }
  }

  const _specialDealList = specialDealList.filter((item) => item.slug !== 'weekly-specials');

  const bannerId = getBannerIdByUrl('weekly-specials');
  const isWeeklySpecialsLarge = bannerId === BANNER_ID.WEEKLY_SPECIALS_LARGE;

  /** Special weekly banner */
  const specialDealBannerParam = {
    idBanner: bannerId,
    limit: isWeeklySpecialsLarge ? 30 : BANNER_LIMIT_DEFAULT
  };

  const specialDealBannerHash = objectToHash(specialDealBannerParam);
  const specialBannerList = !isUndefined(bannerList[specialDealBannerHash]) ? bannerList[specialDealBannerHash] : [];

  // Get weekly special small
  let specialSmallList = [];
  let specialSmallTwoList = [];
  let specialLargeTwoList = [];
  if (isWeeklySpecialsLarge) {
    const smallSpecialBannerParam = {
      idBanner: BANNER_ID.WEEKLY_SPECIALS_SMALL,
      limit: 30
    };

    const smallSpecialDealBannerHash = objectToHash(smallSpecialBannerParam);
    specialSmallList = !isUndefined(bannerList[smallSpecialDealBannerHash])
      ? bannerList[smallSpecialDealBannerHash]
      : [];

    const smallSpecialBannerTwoParam = {
      idBanner: BANNER_ID.WEEKLY_SPECIALS_SMALL_02,
      limit: 30
    };

    const smallSpecialDealBannerTwoHash = objectToHash(smallSpecialBannerTwoParam);
    specialSmallTwoList = !isUndefined(bannerList[smallSpecialDealBannerTwoHash])
      ? bannerList[smallSpecialDealBannerTwoHash]
      : [];

    const largeSpecialBannerTwoParam = {
      idBanner: BANNER_ID.WEEKLY_SPECIALS_LARGE_02,
      limit: 30
    };

    const largeSpecialDealBannerTwoHash = objectToHash(largeSpecialBannerTwoParam);
    specialLargeTwoList = !isUndefined(bannerList[largeSpecialDealBannerTwoHash])
      ? bannerList[largeSpecialDealBannerTwoHash]
      : [];
  }

  const renderMobile = () => (
    <WrapLayout>
      {renderHeader({
        title,
        handleClick: handleShowSubCategory,
        categories: _specialDealList,
        isSubCategoryOnTop,
        showSubCategory
      })}
      {renderContent({
        specialBannerList,
        specialSmallList,
        specialSmallTwoList,
        specialLargeTwoList
      })}
    </WrapLayout>
  );

  const renderDesktop = () => (
    <WrapLayout>
      {renderContent({
        specialBannerList,
        specialSmallList,
        specialSmallTwoList,
        specialLargeTwoList
      })}
    </WrapLayout>
  );

  const switchVersion = {
    MOBILE: () => renderMobile(),
    DESKTOP: () => renderDesktop()
  };

  return <div className={'special-deal-detail-container'}>{switchVersion[getDeviceVersion()]()}</div>;
};

export default renderView;
