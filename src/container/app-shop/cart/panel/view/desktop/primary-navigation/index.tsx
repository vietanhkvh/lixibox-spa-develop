import * as VARIABLE from 'style/variable';
import { ROUTING_SHOP_INDEX, ROUTING_CHECK_OUT } from 'routings/path';
import SubmitButton from 'components/ui/submit-button';
import { mergeStyle } from 'utils/responsive';

import STYLE from '../../style';

export const renderNavigateButton = ({
  history,
  activeNavList,
  url = '',
  style = {},
  buyMoreBtnStyle = {},
  isModal = false,
  isCartEmpty = false,
  submitLoading = false,
  isHiddenBtnGroup = false,
  isPrivateMode,
  privateModeLink,
  closeModal = () => {},
  handleCheckout = () => {},
  onCheckoutContinueClick
}) => {
  const buttonList = {
    1: () => {
      const backTopShopButtonProps = {
        color: 'white',
        title: 'Mua thêm'.toLocaleUpperCase(),
        style: mergeStyle(STYLE.buttonNavigation.margin({ isLeft: false }), buyMoreBtnStyle, {
          border: `1px solid ${VARIABLE.color3E}`
        }),
        onSubmit: () => {
          history.push(!!isPrivateMode ? privateModeLink : ROUTING_SHOP_INDEX);
          'function' === typeof closeModal && closeModal();
        },
        dataTestId: 'btn-back-to-shop'
      };

      const nextToDeliveryButtonProps = {
        title: (!isModal ? 'Tiếp theo' : 'Đặt Hàng').toLocaleUpperCase(),
        loading: submitLoading,
        disabled: isCartEmpty,
        onSubmit: () => onCheckoutContinueClick?.(),
        style: STYLE.buttonNavigation.margin({ isLeft: true }),
        dataTestId: 'btn-order-cart'
      };

      return (
        <div style={mergeStyle(STYLE.buttonNavigation.container, !isModal && STYLE.buttonNavigation.modal, style)}>
          <SubmitButton {...backTopShopButtonProps} />
          <SubmitButton {...nextToDeliveryButtonProps} />
        </div>
      );
    },

    2: () => {
      const backTopShopButtonProps = {
        color: 'white',
        title: 'Quay Lại'.toLocaleUpperCase(),
        style: mergeStyle(STYLE.buttonNavigation.margin({ isLeft: false }), {
          border: `1px solid ${VARIABLE.color3E}`
        }),
        onSubmit: () => history.push(ROUTING_CHECK_OUT),
        dataTestId: 'btn-back-to-shop'
      };

      const nextToDeliveryButtonProps = {
        title: 'Thanh Toán'.toLocaleUpperCase(),
        loading: submitLoading,
        onSubmit: () => handleCheckout(),
        style: mergeStyle(STYLE.buttonNavigation.margin({ isLeft: true })),
        dataTestId: 'btn-checkout'
      };

      return isHiddenBtnGroup ? null : (
        <div style={mergeStyle(STYLE.buttonNavigation.container, false === isModal && STYLE.buttonNavigation.modal)}>
          <SubmitButton {...backTopShopButtonProps} />
          <SubmitButton {...nextToDeliveryButtonProps} />
        </div>
      );
    },

    3: () => {
      const orderTrackingButtonProps = {
        title: 'Theo Dõi Đơn Hàng',
        onSubmit: () => history.push(url),
        style: { backgroundColor: VARIABLE.color20, marginBottom: 0 },
        titleStyle: { fontWeight: VARIABLE.fontBold },
        dataTestId: 'btn-tracking-product'
      };

      return (
        <div style={mergeStyle(STYLE.buttonNavigation.container, false === isModal && STYLE.buttonNavigation.modal)}>
          <SubmitButton {...orderTrackingButtonProps} />
        </div>
      );
    }
  };

  const id = isModal ? Array.isArray(activeNavList) && activeNavList.length > 0 && activeNavList[0].id : 1;

  return buttonList[id]();
};
