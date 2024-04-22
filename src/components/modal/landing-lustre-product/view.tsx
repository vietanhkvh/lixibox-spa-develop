import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';

import { IProps } from './model';
import STYLE from './style';

const renderProduct = (item, index) => (
  <a
    key={`product-item-${index}`}
    href={`${ROUTING_PRODUCT_DETAIL_PATH}/${(item && item.slug) || ''}`}
    target={'_blank'}
    rel="noreferrer"
    style={STYLE.productInfo.product.container}
  >
    <div style={STYLE.productInfo.product.num}>{index + 1}</div>
    <div style={STYLE.productInfo.product.name}>{(item && item.name) || ''}</div>
    <div
      style={STYLE.productInfo.product.img((item && item.primary_picture && item.primary_picture.medium_url) || '')}
    ></div>
  </a>
);

export function renderComponent({ props }) {
  const { data } = props as IProps;

  return (
    <div style={STYLE.container}>
      <div style={STYLE.img((data && data.image_url) || '')}></div>
      <div style={STYLE.productInfo.container}>
        {data && Array.isArray(data.boxes) && data.boxes.map(renderProduct)}
      </div>
    </div>
  );
}
