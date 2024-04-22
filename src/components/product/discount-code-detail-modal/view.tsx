import Icon from '../../ui/icon';
import SubmitButton from '../../ui/submit-button';
import DiscountBlock from '../../ui/discount-block';

import STYLE from './style';

function renderView() {
  const {
    data: { discountCode }
  } = this.props;

  if (!discountCode) return null;

  const closeIconProps = {
    name: 'close',
    onClick: this.handleCloseModal.bind(this),
    style: STYLE.heading.icon,
    innerStyle: STYLE.heading.innerIcon
  };

  const buttonProps = {
    color: 'black',
    title: 'Áp dụng',
    onSubmit: () => this.handleAddDiscountCode(discountCode.code),
    style: STYLE.content.button
  };

  return (
    <div style={STYLE.container}>
      <div style={STYLE.heading}>
        <div style={STYLE.heading.title}>Mã giảm giá</div>
        <Icon {...closeIconProps} />
      </div>

      <DiscountBlock>
        <div style={STYLE.content.code}>{discountCode.code}</div>
        <div style={STYLE.content.description}>{discountCode.description}</div>
        <SubmitButton {...buttonProps} />
      </DiscountBlock>
    </div>
  );
}

export default renderView;
