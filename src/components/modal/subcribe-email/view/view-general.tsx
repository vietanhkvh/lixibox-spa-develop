import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import FormEntry from 'presentation-component/ui/form-entry';
import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import { validationMessage } from 'utils/validate';
import { ROUTING_PRODUCT_DETAIL_PATH } from 'routings/path';
import SubmitButton from 'presentation-component/ui/submit-button';
import styles from './style.module.scss';

export const Heading = ({ isOpen = false, onClick = () => {} }) => (
  <div className={styles.heading}>
    WELCOME GIFT
    <div onClick={onClick} className={styles.outerIcon}>
      <div
        className={classnames(styles.icon, {
          [styles.isOpen]: isOpen
        })}
      ></div>
    </div>
  </div>
);

export const Message = ({ isSuccess }) => (
  <div className={styles.message}>
    {isSuccess ? (
      <>
        Lixibox gửi tặng bạn mã <span>WELCOME</span> - giảm 20% cho đơn hàng đầu tiên tại Lixibox, tối đa 50.000Đ.{' '}
        <br />
        Chúc bạn sẽ có trải nghiệm mua sắm thú vị tại Lixibox.
      </>
    ) : (
      'Hãy nhập email, số điện thoại của bạn để nhận được mã giảm 20% cho đơn hàng đầu tiên.'
    )}
  </div>
);

export const InputForm = ({ isSubmitLoading, handleSubmitForm }) => {
  const subscribeFormFieldTitle = {
    subscribe: 'email hoặc số điện thoại'
  };
  const subscribeFormSchema = yup.object().shape({
    subscribe: yup.string().phoneOrEmail(({ path }) => validationMessage.phoneOrEmail(subscribeFormFieldTitle[path]))
  });

  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(subscribeFormSchema)
  });

  const buttonSubmitProps = {
    title: 'Gửi',
    onSubmit: handleSubmit(handleSubmitForm),
    loading: isSubmitLoading,
    classes: { container: styles.btnSubmit }
  };

  const formEntryProps = {
    name: 'subscribe',
    placeholder: 'Nhập email hoặc số điện thoại...',
    type: 'text',
    theme: 'rounded',
    classes: { container: styles.inputContainer, input: styles.inputInner, error: styles.errorContainer },
    error: errors['subscribe'],
    ref: register
  };

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit(handleSubmitForm)} noValidate>
      <FormEntry {...formEntryProps} />
      <SubmitButton {...buttonSubmitProps} />
    </form>
  );
};

const welcomeBg = CDN_ASSETS_PREFIX('/welcome/img-new.jpg');
export const ProductInfo = () => {
  const navLinkProps = {
    target: '_blank',
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/lixibox-daily-facial-mask-sheet-acai-berry`,
    className: styles.productInfo
  };

  const nameProps = {
    className: styles.name
  };

  return (
    <NavLink {...navLinkProps}>
      <Image
        {...{
          src: welcomeBg,
          alt: '',
          className: styles.image
        }}
      />
      <div {...nameProps}>Lixibox Daily Facial Mask Sheet - Acai Berry</div>
    </NavLink>
  );
};
