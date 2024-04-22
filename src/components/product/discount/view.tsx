import Icon from '../../../components/ui/icon';
import DiscountBlock from '../../../components/ui/discount-block';

import { currenyFormat } from '../../../utils/currency';
import { isEmptyKeyObject } from '../../../utils/validate';
import { isMobileVersion } from '../../../utils/responsive';
import { DISCOUNT_CODE_TYPE } from '../../../constants/application/discount-code';

import { IProductDiscountProps, IProductDiscountState } from './model';
import * as VARIABLE from '../../../style/variable';
import STYLE from './style';

const renderContent = ({ content, style }) => <div style={style}>{content}</div>;

const renderButton = ({ handleOnClick, isAddedToCart, platforms }) => {
  const isApplyForWeb = 0 === platforms.length || platforms.indexOf('web') >= 0;
  const ctaText = !!isApplyForWeb ? `Áp dụng` : 'Mã này chỉ áp dụng trên: ' + platforms.join(', ');
  const ctaProps = {
    onClick: !!isApplyForWeb ? handleOnClick : null,
    style: STYLE.info.btnWrap.btn(isAddedToCart && isApplyForWeb)
  };

  return (
    <div style={STYLE.info.btnWrap}>
      <div {...ctaProps}>{ctaText}</div>
    </div>
  );
};

const renderWarningMessage = () => (
  <div style={STYLE.warningMessage}>{'Bạn phải mua sản phẩm này để được áp dụng mã giảm giá.'}</div>
);

const renderDiscount = ({
  handleAddDiscountCode,
  code = '',
  desc = '',
  info = '',
  platforms = [],
  discountCodePrice = '',
  isAddedToCart = false
}) => {
  const contentProps = { content: `Nhập mã ${code}`, style: STYLE.info.title };
  const ctaProps = {
    handleOnClick: () => handleAddDiscountCode(code),
    isAddedToCart,
    platforms
  };
  const descriptionProps = { content: desc, style: STYLE.info.content };

  return (
    <div style={STYLE.info.container} className={'info-detail'}>
      {renderContent(contentProps)}
      {/* {info && renderContentDetail(contentDetailProps)} */}
      {desc && renderContent(descriptionProps)}
      {!isAddedToCart && renderWarningMessage()}
      {renderButton(ctaProps)}
    </div>
  );
};

const renderTitle = ({ code = '' }) => (
  <div style={STYLE.content}>
    {`Nhập mã giảm giá này `}
    <span style={STYLE.highlight}>{code}</span>
  </div>
);

export function renderComponent({ props, state, handleShowDiscountCode, handleAddDiscountCode }) {
  const { discountCodeList, price, isAddedToCart } = props as IProductDiscountProps;
  const { showDiscountCode } = state as IProductDiscountState;

  const iconProps = {
    name: 'angle-down',
    style: STYLE.icon,
    innerStyle: STYLE.innerIcon
  };

  function renderDiscountCodeDetail(item) {
    const id = (!isEmptyKeyObject(item, 'id') && item.id) || 0;
    const code = (!isEmptyKeyObject(item, 'code') && item.code) || '';
    const desc = (!isEmptyKeyObject(item, 'description') && item.description) || '';
    let amount = (!isEmptyKeyObject(item, 'amount') && item.amount) || '';
    const unit = (!isEmptyKeyObject(item, 'unit') && item.unit) || '';
    const platforms = item.apply_for_platform || [];

    let discountCodePrice = '';
    if (unit === 'vnd') {
      discountCodePrice = `${currenyFormat(price - amount, 'currency')}đ`;
      amount = currenyFormat(amount, 'currency');
    } else {
      discountCodePrice = `${currenyFormat((price * (100 - amount)) / 100, 'currency')}đ`;
    }

    const info = (amount && unit && `${amount}${DISCOUNT_CODE_TYPE[unit]}`) || '';
    const discountProps = {
      handleAddDiscountCode,
      code,
      desc,
      info,
      renderDiscount,
      discountCodePrice,
      platforms,
      isAddedToCart
    };

    return !isMobileVersion() ? (
      <DiscountBlock
        key={`discount-code-${id}`}
        style={STYLE.item}
        innerStyle={STYLE.innerItem}
        className={'discount-container'}
        dottedColor={VARIABLE.colorWhite}
        backgroundColor={VARIABLE.colorE5}
      >
        {renderTitle({ code })}
        <Icon {...iconProps} />
        {renderDiscount(discountProps)}
      </DiscountBlock>
    ) : (
      <DiscountBlock key={`discount-code-${id}`} dottedColor={VARIABLE.colorWhite} backgroundColor={VARIABLE.colorE5}>
        <div style={STYLE.item} onClick={handleShowDiscountCode} className={'discount-container'}>
          {renderTitle({ code })}
          <Icon {...iconProps} />
        </div>
        {showDiscountCode && renderDiscount(discountProps)}
      </DiscountBlock>
    );
  }

  const isRenderList = Array.isArray(discountCodeList) && discountCodeList.length > 0;
  if (!isRenderList) return null;

  return <div style={STYLE.container}>{discountCodeList.map(renderDiscountCodeDetail)}</div>;
}
