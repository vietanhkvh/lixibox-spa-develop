import Image from 'presentation-component/ui/image';
import SvgIcon from 'presentation-component/ui/icon';
import Icon from '../../ui/icon';
import { currenyFormat } from '../../../utils/currency';
import { isEmptyKeyObject } from '../../../utils/validate';
import { ROUTING_MEMBERSHIP } from 'routings/path';

import STYLE from './style';
import styles from './style.module.scss';
import { DirectLinkButton, InputForm, MessageSettedBirthday } from './view-general';

export const renderProduct = ({ props }) => {
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
    href: '#',
    style: STYLE.desktop.fullContent.product.image
  };

  const nameProps = {
    target: '_blank',
    style: STYLE.desktop.fullContent.product.name,
    href: '#'
  };

  return (
    <div style={STYLE.desktop.fullContent.product.container}>
      <a {...imageLinkProps}>
        <Image
          {...{
            alt: '',
            src: productImageUrl,
            style: STYLE.desktop.fullContent.product.image.img
          }}
        />
      </a>
      <a {...nameProps}>{(box && box.name) || ''}</a>
      {box && !!box.original_price && (
        <div style={STYLE.desktop.fullContent.product.price}>
          Giá: <span style={STYLE.desktop.fullContent.product.price.num}>{currenyFormat(box.original_price)}</span>
        </div>
      )}
    </div>
  );
};

const renderContent = ({
  inputValue,
  handleInputOnChange,
  handleSubmit,
  handleToggleMinial,
  content,
  type,
  isBirthdaySet,
  userBirthMonth,
  membership_level,
  successMessage
}) => {
  const iconProps = {
    name: 'logo-line',
    style: STYLE.desktop.fullContent.content.logo,
    innerStyle: STYLE.desktop.fullContent.content.innerLogoIcon
  };

  const downIconProps = {
    name: 'close',
    className: styles.closeIcon,
    onClick: handleToggleMinial
  };
  const inputFormProps = { inputValue, handleInputOnChange, handleSubmitForm: handleSubmit };
  return (
    <div style={STYLE.desktop.fullContent.content}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>{content.heading}</div>
        <SvgIcon {...downIconProps} />
      </div>
      <Icon {...iconProps} />

      {isBirthdaySet ? (
        <MessageSettedBirthday
          {...{
            handleToggleMinial,
            message: content.settedBirthDayMessage,
            buttonText: content.textLink,
            userBirthMonth,
            membership_level
          }}
        />
      ) : (
        <>
          <div style={STYLE.desktop.fullContent.content.text}>{type === 1 ? content.desc : successMessage}</div>
          {type === 1 && (
            <>
              <DirectLinkButton
                link={ROUTING_MEMBERSHIP}
                handleClick={handleToggleMinial}
                textLink={content.textLink}
              />
              <InputForm {...inputFormProps} />
            </>
          )}
        </>
      )}
    </div>
  );
};

const renderMinimal = ({ handleToggleMinial }) => {
  const giftIconProps = {
    name: 'gift',
    style: STYLE.desktop.minimal.giftIcon,
    innerStyle: STYLE.desktop.minimal.innerGiftIcon,
    onClick: handleToggleMinial
  };

  return (
    <div style={STYLE.desktop.minimal}>
      <Icon {...giftIconProps} />
    </div>
  );
};

const renderFullContent = ({
  props: { isBirthdaySet, userBirthMonth, userInfo },
  inputValue,
  handleInputOnChange,
  handleSubmit,
  handleToggleMinial,
  content,
  type,
  successMessage
}) => (
  <div style={STYLE.desktop.fullContent.container}>
    {/* {renderProduct({ props })} */}
    {renderContent({
      inputValue,
      handleInputOnChange,
      handleSubmit,
      handleToggleMinial,
      content,
      type,
      isBirthdaySet,
      userBirthMonth,
      membership_level: userInfo?.membership_level,
      successMessage
    })}
  </div>
);

const renderView = ({
  props,
  inputValue,
  handleInputOnChange,
  handleSubmit,
  isMinimal,
  handleToggleMinial,
  content,
  type,
  successMessage
}) => {
  return isMinimal
    ? renderMinimal({ handleToggleMinial })
    : renderFullContent({
        props,
        inputValue,
        handleInputOnChange,
        handleSubmit,
        handleToggleMinial,
        content,
        type,
        successMessage
      });
};

export default renderView;
