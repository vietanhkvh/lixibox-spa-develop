import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import SvgIcon from 'presentation-component/ui/icon';
// import { currenyFormat } from '../../../utils/currency';
import { isEmptyKeyObject } from '../../../utils/validate';
import { ROUTING_MEMBERSHIP } from 'routings/path';
import GeneralModal from 'presentation-component/modal/general-modal';

import { DirectLinkButton, InputForm, MessageSettedBirthday } from './view-general';
import { IUserBirthdayProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const renderHeader = ({ closeModal, heading }) => {
  const closeIconProps = {
    name: 'close',
    className: styles.closeIcon,
    onClick: closeModal
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>{heading}</div>
      <SvgIcon {...closeIconProps} />
    </div>
  );
};

const renderProduct = ({ props, content }) => {
  const {
    data: { box }
  } = props;

  const productImageUrl =
    (!isEmptyKeyObject(box, 'primary_picture') &&
      !isEmptyKeyObject(box.primary_picture, 'medium_url') &&
      box.primary_picture.medium_url) ||
    '';

  const imageLinkProps = {
    target: '_blank',
    style: STYLE.mobile.product.image
  };

  // TODO: confirm that this feature will be not use any more
  // const nameProps = {
  //   target: '_blank',
  //   style: STYLE.mobile.product.name
  // };

  return (
    <div style={STYLE.mobile.product}>
      {!!productImageUrl && (
        <NavLink to={'#'} style={STYLE.mobile.product.container}>
          <div {...imageLinkProps}>
            <Image
              {...{
                alt: '',
                src: productImageUrl,
                style: STYLE.mobile.product.image.img
              }}
            />
          </div>
          {/* TODO: confirm that this feature will be not use any more */}
          {/* <div {...nameProps}>{(box && box.name) || ''}</div> */}
          {/* <div style={STYLE.mobile.product.price}>{currenyFormat(box.original_price)}</div> */}
        </NavLink>
      )}
      <div style={STYLE.mobile.product.description}>{content}</div>
    </div>
  );
};

const renderSendInfo = ({ inputValue, handleInputOnChange, handleSubmit }) => {
  const inputFormProps = { inputValue, handleInputOnChange, handleSubmitForm: handleSubmit };

  return (
    <div style={STYLE.mobile.sendInfo}>
      <div style={STYLE.mobile.sendInfo.form}>
        <InputForm {...inputFormProps} />
      </div>
    </div>
  );
};

const renderView = ({
  props,
  inputValue,
  handleInputOnChange,
  handleSubmit,
  type,
  content,
  isMinimal,
  handleToggleMinial,
  successMessage
}) => {
  const { isBirthdaySet, userBirthMonth, userInfo } = props as IUserBirthdayProps;
  const modalProps = {
    isOpen: !isMinimal,
    isShowHeading: false,
    className: styles.birthdayModal,
    onRightActionClick: handleToggleMinial,
    onRequestClose: handleToggleMinial
  };

  return isMinimal ? (
    <div className={styles.stickyContainer}>
      <SvgIcon name={'gift'} className={styles.giftIcon} onClick={handleToggleMinial} />
    </div>
  ) : (
    <GeneralModal {...modalProps}>
      <div style={STYLE.mobile.container}>
        {renderHeader({ closeModal: handleToggleMinial, heading: content.heading })}
        {isBirthdaySet ? (
          <MessageSettedBirthday
            {...{
              handleToggleMinial,
              message: content.settedBirthDayMessage,
              buttonText: content.textLink,
              userBirthMonth,
              membership_level: userInfo?.membership_level
            }}
          />
        ) : type === 1 ? (
          <>
            {renderProduct({ props, content: content.desc })}
            <DirectLinkButton link={ROUTING_MEMBERSHIP} handleClick={handleToggleMinial} textLink={content.textLink} />
            {renderSendInfo({ inputValue, handleInputOnChange, handleSubmit })}
          </>
        ) : (
          <div className={styles.contentSuccess}>{successMessage}</div>
        )}
      </div>
    </GeneralModal>
  );
};

export default renderView;
