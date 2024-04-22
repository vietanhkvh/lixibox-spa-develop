import { getDeviceVersion } from '../../../../utils/responsive';
import { generateTestId } from 'utils/test-utils';
import ProductSlider from '../../../../components/product/slider';
import ProductDetailItem from '../../../../components/product/detail-item';
import Loading from '../../../../components/ui/loading';
import FadeIn from '../../../layout/fade-in';
import { renderNavigateButton } from '../panel/view/desktop/primary-navigation';

import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const renderProductList = (data) => {
  const productListProps = {
    title: '',
    data: data || [],
    showHeader: false,
    isShowLike: false,
    isShowQuickBuy: true,
    isShowViewMore: false,
    isShowQuickView: false,
    isShowPagination: true,
    column: 5,
    lineTextNumber: 2
  };

  return <ProductSlider {...productListProps} />;
};

const renderProductListMobile = (data) => {
  return (
    <div className={'scroll-view'} style={STYLE.wrapParent.productList}>
      <FadeIn>
        <div style={STYLE.wrapParent.row}>
          {0 === data.length ? (
            <Loading />
          ) : Array.isArray(data) ? (
            data.map((product) => {
              const productDetailItemProps = {
                data: product,
                isShowQuickView: false,
                isShowQuickBuy: true,
                style: STYLE.itemWrap,
                isShowLike: false
              };

              return (
                <div key={product.id} style={STYLE.itemWrap} className={styles.itemWrap}>
                  <ProductDetailItem {...productDetailItemProps} />
                </div>
              );
            })
          ) : (
            []
          )}
        </div>
      </FadeIn>
    </div>
  );
};

const renderView = (props: IProps) => {
  const { data, closeModal } = props;
  const switchView = {
    MOBILE: () => renderProductListMobile(data.addOnList),
    DESKTOP: () => renderProductList(data.addOnList)
  };

  return (
    <div style={STYLE.wrapParent} {...generateTestId({ name: 'order-payment-modal' })}>
      {switchView[getDeviceVersion()]()}
      {renderNavigateButton({
        closeModal,
        activeNavList: 1,
        history: data.history,
        style: STYLE.btnGroup,
        buyMoreBtnStyle: STYLE.btnGroup.buyMoreBtn
      } as any)}
    </div>
  );
};

export default renderView;
