import TestimonialItem from '../../../components/item/feedback-testimonial';
import * as LAYOUT from '../../../style/layout';
import componentStyles from 'style/component.module.scss';
import STYLE from './style';

export const renderMobile = ({ props, testimonialList, column, openModal }) => {
  const { onItemClick } = props;
  const generateItemProps = (testimonial) => ({
    key: testimonial.id,
    data: testimonial,
    style: STYLE.column[column || 4]
  });

  return (
    <div className={componentStyles.blockContent} style={Object.assign({}, STYLE.mobileWrap)}>
      <div style={Object.assign({}, LAYOUT.flexContainer.noWrap, STYLE.mobileWrap.panel)}>
        {Array.isArray(testimonialList) &&
          testimonialList.map((testimonial, index) => {
            const itemProps = generateItemProps(testimonial);
            return (
              <div {...itemProps}>
                <TestimonialItem
                  data={testimonial}
                  openModal={openModal}
                  onClick={() => onItemClick?.(testimonial, index)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
