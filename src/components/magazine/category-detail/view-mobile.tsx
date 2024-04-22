import { ROUTING_MAGAZINE_CATEGORY_PATH, ROUTING_MAGAZINE } from '../../../routings/path';
import { isMobileVersion } from '../../../utils/responsive';

import MobileAutoDisplayHeader from '../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../presentation-component/general/mobile-tab-header';

import Loading from '../../ui/loading';

import ItemList from '../item-list';

import { IProps } from './model';
import STYLE from './style';

const mainBlockContent = ({
  list,
  slug,
  state,
  handleShowSubCategory,
  categories,
  isShowMobileBreadCrumb,
  isShowCategory,
  magazineDashboard,
  onItemClick
}) => {
  const dynamicTabs =
    (!!magazineDashboard &&
      magazineDashboard.categories &&
      magazineDashboard.categories.map((item, index) => ({
        id: index,
        code: item.slug,
        title: item.name,
        selected: slug === item.slug,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.slug}`
      }))) ||
    [];

  const tabs = [
    {
      id: -1,
      code: 'all',
      title: 'Tất cả',
      link: ROUTING_MAGAZINE
    },
    ...dynamicTabs
  ];

  return list && 0 === list.length ? (
    <Loading style={{ height: 250 }} />
  ) : (
    <div>
      {!!isShowMobileBreadCrumb && !!isMobileVersion() && (
        <MobileAutoDisplayHeader row={1}>
          <MobileTabHeader isEqually={false} tabs={tabs} />
        </MobileAutoDisplayHeader>
      )}

      <div style={STYLE.categoryDetail}>
        <ItemList list={list} isShowCategory={isShowCategory} onItemClick={onItemClick} />
      </div>
    </div>
  );
};

const renderView = ({ props, state, handleShowSubCategory }) => {
  const { list, slug, categories, magazineDashboard, isShowMobileBreadCrumb, isShowCategory, onItemClick } =
    props as IProps;

  return (
    <div className={'magazine-category'}>
      {mainBlockContent({
        list,
        slug,
        state,
        handleShowSubCategory,
        categories,
        isShowMobileBreadCrumb,
        isShowCategory,
        magazineDashboard,
        onItemClick
      })}
    </div>
  );
};

export default renderView;
