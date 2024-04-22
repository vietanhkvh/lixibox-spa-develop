import WrapLayout from '../../layout/wrap';

import { getUrlParameter } from '../../../utils/format';
import { isSafeData } from '../../../utils/check-safe-data';
import { objectToHash } from '../../../utils/encode';

import * as VARIABLE from '../../../style/variable';

import STYLE from './style';
import { IState, IProps } from './model';
import HeadingView from './view-heading';
import SectionView from './view-section';
import ContentView from './view-content';
import DiscountCodeView from './view-discount-code';
import { getItemIndexAcrossPages } from 'utils/page';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

const renderView = ({
  props,
  state,
  handleClickDiscountCode,
  handleFilterSubmit,
  generateBoxesQueryId,
  shouldDisplaySections
}) => {
  const {
    history,
    location,
    themeStore,
    match: {
      params: { idSpecial } // REFACTOR: Access via Redux state
    },
    themeStore: { boxes }
  } = props as IProps;

  const { urlList, filterBrands: brandList } = state as IState;

  const bids = getUrlParameter(location.search, 'brands');
  const pl = getUrlParameter(location.search, 'pl');
  const ph = getUrlParameter(location.search, 'ph');
  const sort = getUrlParameter(location.search, 'sort');
  const stockStatus = getUrlParameter(location.search, 'stock_status');

  const keyHashTheme = objectToHash({ id: idSpecial });
  const keyHashBoxes = generateBoxesQueryId(props);

  const productThemeList = themeStore.productByThemeId[keyHashTheme] || {};
  const productBoxes = themeStore.boxes.byQuery[keyHashBoxes] || {};

  const themeBoxesList = (productBoxes && productBoxes.boxes) || [];
  const discountCodes = (productThemeList && productThemeList.discount_codes) || [];
  const bannerImage =
    (productThemeList &&
      productThemeList.theme &&
      productThemeList.theme.top_banner &&
      productThemeList.theme.top_banner.original_url) ||
    '';

  const { current_page, per_page, total_pages } = (productBoxes.filter && productBoxes.filter.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  const paginationProps = {
    per: per_page,
    urlList: 0 !== themeBoxesList.length ? urlList : [],
    total: total_pages,
    current: current_page
  };

  const title = isSafeData(productThemeList, ['theme', 'name']) ? productThemeList.theme.name : '';
  const color = isSafeData(productThemeList, ['theme', 'color'])
    ? '#' + productThemeList.theme.color
    : VARIABLE.colorBlack;

  const sectionIndex = isSafeData(productThemeList, ['sections']) ? productThemeList.sections : [];
  const displayableSections = shouldDisplaySections(location.search)
    ? sectionIndex
        .map(
          (section) =>
            themeStore.sectionsById[section.id] &&
            themeStore.sectionsById[section.id].section &&
            themeStore.sectionsById[section.id].section.section
        )
        .filter((section) => !!section)
    : [];

  const minPrice = (productBoxes && productBoxes.available_filters && productBoxes.available_filters.pl) || 0;

  const maxPrice = (productBoxes && productBoxes.available_filters && productBoxes.available_filters.ph) || 0;

  const headingViewProps = {
    bannerImage,
    title,
    color
  };

  const discountCodeViewProps = {
    handleClickDiscountCode,
    list: discountCodes,
    bannerImage,
    color
  };

  const sectionProps = {
    sections: displayableSections,
    color,
    onSectionItemClick: (box, index, section) => {
      gatewayTrackViewContentFromList({ source: ViewedSource.THEME_SECTION, sourceId: idSpecial, box, index });
    },
    idSpecial
  };

  const contentViewProps = {
    history,
    list: themeBoxesList,
    paginationProps,
    isLoading: boxes.fetching,
    brandList,
    minPrice,
    maxPrice,
    bids,
    pl,
    ph,
    sort,
    stockStatus,
    handleFilterSubmit,
    onItemClick: (box, index) => {
      gatewayTrackViewContentFromList({
        source: ViewedSource.THEME,
        sourceId: idSpecial,
        box,
        index: getItemIndexAcrossPages({
          itemIndexInPage: index,
          currentPage: paginationProps?.current,
          perPage: paginationProps?.per
        })
      });
    },
    slugIdSpecial: idSpecial
  };

  return (
    <>
      <WrapLayout style={STYLE.heading.wrap} type={'larger'}>
        <HeadingView {...headingViewProps} />
      </WrapLayout>

      <WrapLayout>
        <DiscountCodeView {...discountCodeViewProps} />
        <SectionView {...sectionProps} />
        <ContentView {...contentViewProps} />
      </WrapLayout>
    </>
  );
};

export default renderView;
