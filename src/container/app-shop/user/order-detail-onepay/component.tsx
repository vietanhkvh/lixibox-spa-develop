import { useEffect } from 'react';

import * as ROUTINGS from '../../../../routings/path';

import Loading from '../../../../components/ui/loading';
import SubmitButton from '../../../../components/ui/submit-button';
import { storageKey } from '../../../../constants/application/client-storage';
import styles from './style.module.scss';

const Component = (props) => {
  const {
    match: {
      params: { orderNumber }
    },
    cartStore: { isUpdatingOnepayPaymentAddreessUrl, isUpdatingOnepayPaymentAddreessUrlSuccess },
    history,
    updateOnepayPayment
  } = props;

  let isWatingUpdate = false;

  const handleOnepayFallBack = () => {
    const { location } = props;
    const params = location.search && 0 < location.search.length ? location.search.replace('?', '') : '';

    if (params.length > 0) {
      isWatingUpdate = true;
      updateOnepayPayment({ orderNumber, params });
    } else {
      window.location.href = ROUTINGS.ROUTING_SHOP_INDEX;
      return;
    }
  };

  useEffect(() => {
    handleOnepayFallBack();
  }, []);

  useEffect(() => {
    if (!!isWatingUpdate && !isUpdatingOnepayPaymentAddreessUrl) {
      isWatingUpdate = false;
      localStorage.setItem(storageKey.MOE_PURCHASE_BY_ONEPAY_TRACKING_PENDING, String(true));
      setTimeout(() => history.push(`${ROUTINGS.ROUTING_USER_ORDER}/${orderNumber}`), 1500);
    }
  }, [isUpdatingOnepayPaymentAddreessUrl, isUpdatingOnepayPaymentAddreessUrlSuccess]);

  const buttonSubmitProps = {
    title: 'Chi tiết đơn hàng',
    className: styles.submitButton,
    onSubmit: () => history.push(`${ROUTINGS.ROUTING_USER_ORDER}/${orderNumber}`)
  };

  return (
    <div className={styles.container}>
      <Loading />
      <div className={styles.text}>Giao dịch OnePay đang thực hiện...</div>
      <div className={styles.subText}>Vui lòng chờ trong giây lát</div>
      <SubmitButton {...buttonSubmitProps} />
    </div>
  );
};

export default Component;
