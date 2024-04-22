import ImageSliderItem from '../image-slider-item';

import * as LAYOUT from '../../../../style/layout';
import STYLE from './style';

function handleRenderItem(item, index) {
  const imageSliderItemProps = {
    item,
    column: this.column,
    openModal: this.openModal,
    key: `image-slider-item-${index}`,
    style: this.onlyOneItem ? STYLE.mobileWrap.center : {}
  };

  return <ImageSliderItem {...imageSliderItemProps} />;
}

export const renderMobile = ({ imageList, column, openModal }) => {
  const len = (Array.isArray(imageList) && imageList.length) || 0;

  return len === 0 ? null : (
    <div style={STYLE.mobileWrap}>
      <div style={Object.assign({}, LAYOUT.flexContainer.noWrap, STYLE.mobileWrap.panel)}>
        {imageList.map(handleRenderItem, {
          column,
          openModal,
          onlyOneItem: len === 1
        })}
      </div>
    </div>
  );
};
