import { MODAL_LANDING_LUSTRE_PRODUCT } from '../../../../constants/application/modal';

import { IProps } from './model';
import STYLE from './style';

export function renderComponent({ props }) {
  const { item, column, openModal, style } = props as IProps;

  return (
    <div
      style={Object.assign({}, STYLE.column[column || 3], style)}
      onClick={() => openModal(MODAL_LANDING_LUSTRE_PRODUCT({ data: item }))}
    >
      <div style={STYLE.container.itemSliderPanel((item && item.image_url) || '')}></div>
    </div>
  );
}
