import Loading from '../../../../components/ui/loading';
import { isUndefined } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';
import { isMobileVersion } from '../../../../utils/responsive';
import { scrollElement } from '../../../../utils/scroll';

import Page404 from '../../../exception/404';
import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';
import SeparateLine from '../../../../presentation-component/ui/separate-line';
import TagLine from '../../../../components/magazine/tag-line';
import Pagination from 'components/general/pagination';
import Widget from '../../../../components/magazine/widget';
import CategoryDetail from '../../../../components/magazine/category-detail';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';

import { IProps, IState } from './model';
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

const isTagOrCategory = (slug) => {
  return 'tag' === slug;
};

const renderView = ({ props, state }) => {
  const {
    location,
    match: {
      params: { idCategory, idTag }
    },
    magazineDefaultParams,
    magazineStore: { magazineCategory, magazineList, magazineDashboard, magazineTagName, isMagazineCategoryNotFound },
    perPage
  } = props as IProps;

  const { page, urlList } = state as IState;

  // TODO
  const arrPath = location.pathname.split('/');
  const path = arrPath.length > 2 ? arrPath[2] : '';
  const slug = isTagOrCategory(path) ? idTag : idCategory;
  const data = isTagOrCategory(path) ? magazineTagName : magazineCategory;

  const keyHash = objectToHash({ slug, page, perPage });
  const list = !isUndefined(data[keyHash]) ? data[keyHash].magazines : [];

  const newMagazineHash = objectToHash(magazineDefaultParams);
  const newMagazineList = magazineList[newMagazineHash] || [];

  const _urlList = 0 !== list.length ? urlList : [];

  const { current_page, per_page, total_pages } = (data[keyHash] && data[keyHash].paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };

  const _categories = (magazineDashboard && magazineDashboard.categories) || [];
  const categories = _categories.filter((item) => item.slug !== slug);

  if (!!isMagazineCategoryNotFound) {
    return <Page404 />;
  }

  const isTagUrl = isTagOrCategory(path);

  const categoryDetailProps = {
    list,
    slug,
    isTagUrl,
    categories,
    isShowCategory: false,
    magazineDashboard,
    onItemClick: (magazine, index) => {
      gatewayTrackViewedMagazineFromList({ source: ViewedSource.MAGAZINE_LIST, sourceId: idCategory, index, magazine });
    }
  };

  const txtExtra = true === isTagUrl ? 'Tags: #' : '';

  const tagLineProps = {
    title: txtExtra + slug,
    style: !isMobileVersion() ? { paddingBottom: 0 } : {}
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'normal',
    customStyle: { paddingTop: 0 },
    subContainer: (
      <div style={{ paddingTop: 50 }}>
        <Widget title={'Bài viết nổi bật'} list={newMagazineList} />
      </div>
    ),
    mainContainer: <CategoryDetail {...categoryDetailProps} />
  };

  return (
    <WrapLayout>
      {(!isMobileVersion() || isTagUrl) && <TagLine {...tagLineProps} />}

      {!!isMobileVersion() ? (
        <CategoryDetail {...categoryDetailProps} />
      ) : !list || !list.length ? (
        <Loading />
      ) : (
        <SplitLayout {...splitLayoutProps} />
      )}

      <Pagination
        {...{
          per: per_page,
          urlList: _urlList,
          total: total_pages,
          current: current_page,
          handleClick: () => scrollElement({ x: 0, y: 0, isAnimation: true })
        }}
      />
      <SeparateLine />
    </WrapLayout>
  );
};

export default renderView;
