import MainBlock from '../../layout/main-block';
import WrapLayout from '../../layout/wrap';
import LoadingPlaceholder from '../../../components/ui/loading-placeholder';
import { isMobileVersion } from '../../../utils/responsive';
import { isEmptyObject } from '../../../utils/validate';
import { objectToHash } from '../../../utils/encode';

import STYLE from './style';
import { IProps } from './model';
import ProductItem from 'presentation-component/product/product-item';
import ItemVerticalList from 'presentation-component/item-list-hoc/item-vertical-list';

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
  const list = isMobileVersion() ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div style={STYLE.placeholder}>
      <LoadingPlaceholder
        style={Object.assign({}, STYLE.placeholder.title, isMobileVersion() && STYLE.placeholder.titleMobile)}
      />
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};
const renderContent = ({ list, column }) => {
  return (
    <div>
      <ItemVerticalList column={4}>
        {Array.isArray(list) &&
          list.map((product, index) => {
            const productProps = {
              product,
              isFullPadding: true,
              index
            };

            return (
              <div key={`group-item-${product.id}`} style={Object.assign({}, STYLE.item, STYLE[`column${column}`])}>
                <ProductItem {...productProps} />
              </div>
            );
          })}
      </ItemVerticalList>
    </div>
  );
};

const renderView = ({ props }) => {
  const {
    column,
    groupStore: { groups },
    match: {
      params: { idGroup }
    }
  } = props as IProps;

  const keyHash = objectToHash({ id: idGroup });
  const productList = groups[keyHash] || [];
  const boxesList = (productList && productList.items) || [];

  const mainBlockProps = {
    title: 'Chắc bạn sẽ cần',
    style: {},
    showHeader: true,
    showViewMore: false,
    content: renderContent({ list: boxesList, column })
  };

  return (
    <div className={'re-order-container'} style={STYLE.container}>
      <WrapLayout>
        {isEmptyObject(productList) ? renderLoadingPlaceholder() : <MainBlock {...mainBlockProps}></MainBlock>}
      </WrapLayout>
    </div>
  );
};

export default renderView;
