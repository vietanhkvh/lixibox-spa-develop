import ImageSliderItem from '../image-slider-item-community';

import * as LAYOUT from '../../../style/layout';
import STYLE from './style';

export const renderMobile = ({ imageList, column, handleOmitImgHeight }) => {
  return (
    <div style={STYLE.mobileWrap}>
      <div style={Object.assign({}, LAYOUT.flexContainer.noWrap, STYLE.mobileWrap.panel)}>
        {Array.isArray(imageList) &&
          imageList.map((item, index) => (
            <ImageSliderItem
              key={`image-slider-item-${index}`}
              item={item}
              column={column}
              handleOmitImgHeight={handleOmitImgHeight}
            />
          ))}
      </div>
    </div>
  );
};
