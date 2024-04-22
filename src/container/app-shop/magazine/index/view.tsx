import WrapLayout from '../../../layout/wrap';

import Pagination from 'components/general/pagination';
import CategoryDetail from '../../../../components/magazine/category-detail';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';
import SeparateLine from '../../../../presentation-component/ui/separate-line';
import { scrollElement } from '../../../../utils/scroll';
import { getUrlParameter } from '../../../../utils/format';
import { isUndefined } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';
import { isMobileVersion } from '../../../../utils/responsive';
import { ROUTING_MAGAZINE_CATEGORY_PATH, ROUTING_MAGAZINE } from '../../../../routings/path';

import { IProps } from './model'; //IState
import STYLE from './style';
import { gatewayTrackViewedMagazineFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

export const renderItemPlaceholder = (item) => (
  <div
    style={Object.assign({}, STYLE.placeholder.productItem, isMobileVersion() && STYLE.placeholder.productMobileItem)}
    key={item}
  >
    <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.lastText} />
  </div>
);

const renderView = ({ props, state }) => {
  const {
    magazineDefaultParams,
    magazineStore: { magazineDashboard, magazineList, magazineHomePaging }
  } = props as IProps;

  const page: any = getUrlParameter(window.location.search, 'page') || 1;
  const params = Object.assign({}, magazineDefaultParams, { page });

  const keyHashMagazineDefault = objectToHash(params);
  const magazineDefaultList = !isUndefined(magazineList[keyHashMagazineDefault])
    ? magazineList[keyHashMagazineDefault]
    : [];

  const dynamicTabs =
    (!!magazineDashboard &&
      magazineDashboard.categories &&
      magazineDashboard.categories.map((item, index) => ({
        id: index,
        code: item.slug,
        title: item.name,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.slug}`
      }))) ||
    [];

  const tabs = [
    {
      id: -1,
      code: 'all',
      title: 'Tất cả',
      selected: true,
      link: ROUTING_MAGAZINE
    },
    ...dynamicTabs
  ];

  let urlList = [];
  for (let i = 1; i <= magazineHomePaging.total_pages; i++) {
    urlList.push({
      number: i,
      title: i,
      link: `${ROUTING_MAGAZINE}?page=${i}`
    });
  }

  return (
    <WrapLayout>
      {!!isMobileVersion() && (
        <MobileAutoDisplayHeader row={1}>
          <MobileTabHeader isEqually={false} tabs={tabs} />
        </MobileAutoDisplayHeader>
      )}
      <CategoryDetail
        {...{
          list: magazineDefaultList,
          slug: '',
          isTagUrl: false,
          categories: [],
          isShowMobileBreadCrumb: false,
          onItemClick: (magazine, index) => {
            gatewayTrackViewedMagazineFromList({ source: ViewedSource.MAGAZINE_LIST, index, magazine });
          }
        }}
      />
      <Pagination
        {...{
          urlList,
          per: magazineHomePaging?.per_page || 0,
          total: magazineHomePaging?.total_pages || 0,
          current: magazineHomePaging?.current_page || 0,
          handleClick: () => scrollElement({ x: 0, y: 0, isAnimation: true })
        }}
      />
      {!!isMobileVersion() && <SeparateLine />}
      {/* TODO: remove after applying new UI  */}
      {/* {!isPriorityBlock && !isMobileVersion() && <MagazineCategoryList tabs={tabs} />} */}
    </WrapLayout>
  );
};

export default renderView;
