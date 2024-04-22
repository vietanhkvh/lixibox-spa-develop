import { ConnectedProps, connect } from 'react-redux';

import { fetchDiscountCodesByCodeAction } from 'flows/discount-code/action';
import { addDiscountCodeAction } from 'flows/cart/action';
import { openAlertAction } from 'flows/alert/action';
import { ALERT_CLIPBOARD_SUCCESS } from 'constants/application/alert';
import { copyTextToClipboard } from 'utils/generic';
import { RootState } from 'types/redux';
import DiscountCodeDetail from './component';

const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart,
  discountCodeStore: state.discountCode
});

const mapDispatchToProps = (dispatch) => ({
  fetchDiscountCodesByCodeAction: (data: any) => dispatch(fetchDiscountCodesByCodeAction(data)),
  addDiscountCodeAction: (data1, data2) => dispatch(addDiscountCodeAction(data1, data2)),
  copyTextToClipboard: (text: string) =>
    copyTextToClipboard(
      text,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    )
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DiscountCodeDetail);
