import TabMobile from '../tab-mobile';
import { TAB_INFO_STATUS } from '../../../constants/application/product';

import { IProps } from './model';
import STYLE from './style';

export function renderComponent({ props }) {
  const {
    data: { product }
  } = props as IProps;

  const data = (product && product.box && product.box.box_products) || [];
  const isIndividual = product && product.box && product.box.is_individual;

  const productId = (product && product.box && product.box.slug) || '';

  return (
    <div className={'scroll-view'} style={STYLE}>
      <div className={'user-select-all'} style={STYLE.name}>
        {(product && product.box && product.box.name) || ''}
      </div>
      {!!product && !!product.box && !product.box.is_individual && (
        <div className={'user-select-all'} style={STYLE.desc}>
          {(product && product.box && product.box.long_description) || ''}
        </div>
      )}
      <div className={'user-select-all'}>
        <TabMobile
          title={`Thông tin sản phẩm`}
          data={data}
          type={TAB_INFO_STATUS.info}
          isIndividual={isIndividual}
          idProduct={productId}
        />
        <TabMobile
          title={`Cách sử dụng`}
          data={data}
          type={TAB_INFO_STATUS.usage}
          isIndividual={isIndividual}
          idProduct={productId}
        />
        <TabMobile
          title={`Thành phần`}
          data={data}
          type={TAB_INFO_STATUS.ingredients}
          isIndividual={isIndividual}
          idProduct={productId}
        />
      </div>
    </div>
  );
}
