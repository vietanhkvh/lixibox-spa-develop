import FadeIn from '../../layout/fade-in';
import WrapLayout from '../../layout/wrap';
import MainBlock from '../../layout/main-block';

import ProductDetailItem from '../../../components/product/detail-item';
import LoadingPlaceholder from '../../../components/ui/loading-placeholder';

import { stringToHash } from '../../../utils/encode';
import { isMobileVersion } from '../../../utils/responsive';
import { KEY_WORD } from '../../../constants/application/key-word';

import STYLE from './style';
import { IProps } from './model';

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

const renderLoadingPlaceholder = () => {
  const list = isMobileVersion() ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div style={STYLE.placeholder}>
      <LoadingPlaceholder
        style={Object.assign({}, STYLE.placeholder.title, isMobileVersion() && STYLE.placeholder.titleMobile)}
      />
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const renderView = (props: IProps) => {
  const {
    trackingStore,
    match: {
      params: { trackingCode }
    },
    column,
    type,
    likedIdList,
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction
  } = props;
  const keyHashTracking = stringToHash(trackingCode);

  const data = trackingStore.expertTrackingList[keyHashTracking] || [];
  const list = data.beauty_tracking_items || [];
  const length = list.length;

  const mainBlockProps = {
    showHeader: true,
    title: 0 === length ? '' : `#${data.tracking_code}`,
    showViewMore: false,
    content: (
      <FadeIn>
        <div style={STYLE.row}>
          {0 === length
            ? null
            : Array.isArray(list) &&
              list.map((product) => {
                if (product.box && product.box.slug.indexOf(`?${KEY_WORD.EXP_TRACKING_CODE}=`) === -1) {
                  product.box.slug = `${product.box.slug}?${KEY_WORD.EXP_TRACKING_CODE}=${product.tracking_code}`;
                }

                const productDetailItemProps = {
                  type,
                  likedIdList,
                  openModalAction,
                  likeProductAction,
                  unLikeProductAction,
                  addItemToCartAction,
                  data: product.box,
                  isShowQuickView: true
                };

                return (
                  <div key={product.id} style={Object.assign({}, STYLE.itemWrap, STYLE[`column${column}`])}>
                    <ProductDetailItem {...productDetailItemProps} />
                  </div>
                );
              })}
        </div>
      </FadeIn>
    ),
    style: {}
  };

  return (
    <div className={'theme-container'} style={STYLE.container}>
      <WrapLayout>{0 === length ? renderLoadingPlaceholder() : <MainBlock {...mainBlockProps}></MainBlock>}</WrapLayout>
    </div>
  );
};

export default renderView;
