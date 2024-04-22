import ImageSliderItem from '../image-slider-item';

import * as LAYOUT from '../../../style/layout';
import componentStyles from 'style/component.module.scss';
import STYLE from './style';

export const renderMobile = ({ type, magazineList, column, onItemClick }) => {
  return (
    <div className={componentStyles.blockContent} style={Object.assign({}, STYLE.mobileWrap)}>
      <div style={Object.assign({}, LAYOUT.flexContainer.noWrap, STYLE.mobileWrap.panel)}>
        {Array.isArray(magazineList) &&
          magazineList.map((magazine, index) => (
            <div
              key={`image-slide-item-${index}`}
              style={STYLE.mobileWrap.item}
              onClick={() => onItemClick?.(magazine, index)}
            >
              <ImageSliderItem item={magazine} type={type} column={column} />
            </div>
          ))}
      </div>
    </div>
  );
};
