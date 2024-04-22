import Image from 'presentation-component/ui/image';
import SubmitButton from '../../../../components/ui/submit-button';
import { ROUTING_CHECK_OUT } from '../../../../routings/path';
import { currenyFormat } from '../../../../utils/currency';

import styles from './style.module.scss';

export const AddToCartSuccessModalContent = ({ product }) => {
  if (!product) return null;

  const buttonProps = {
    icon: 'cart',
    style: { margin: '-2px 0 0' },
    styleIcon: { color: '#FFF' },
    type: 'link',
    link: ROUTING_CHECK_OUT,
    title: 'Xem giỏ hàng'
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.content}>
        <Image alt="" src={product.image} className={styles.img} />
        <div className={styles.info}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>{currenyFormat(product.price)}</div>
        </div>
      </div>
      <SubmitButton {...buttonProps} />
    </div>
  );
};
