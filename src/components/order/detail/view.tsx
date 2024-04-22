import { useEffect } from 'react';

import { getDeviceVersion } from '../../../utils/responsive';
import { usePrevious } from '../../../utils/hook';
import {
  ALERT_CONFIRM_ORDER_RECEIVED_SUCCESS,
  ALERT_CONFIRM_ORDER_RECEIVED_ERROR
} from '../../../constants/application/alert';
import renderMobile from './view-mobile';
import renderDesktop from './view-desktop';

const View = (props) => {
  const {
    data,
    orderStore: { confirmOrderReceived },
    openAlertAction,
    getOrderAction
  } = props;
  const prevConfirmOrderReceived = usePrevious(confirmOrderReceived);

  useEffect(() => {
    if (
      prevConfirmOrderReceived &&
      data.number === confirmOrderReceived.orderId &&
      prevConfirmOrderReceived.confirming &&
      !confirmOrderReceived.confirming
    ) {
      if (confirmOrderReceived.errored) {
        openAlertAction(ALERT_CONFIRM_ORDER_RECEIVED_ERROR({ message: confirmOrderReceived.errored }));
      } else {
        getOrderAction({ number: data.number });
        openAlertAction(ALERT_CONFIRM_ORDER_RECEIVED_SUCCESS);
      }
    }
  }, [confirmOrderReceived]);

  const switchView = {
    MOBILE: () => renderMobile(props),
    DESKTOP: () => renderDesktop(props)
  };

  return switchView[getDeviceVersion()]();
};

export default View;
